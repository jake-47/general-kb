#!/usr/bin/env python3

"""
Link Checker for Markdown Documentation
--------------------------------------
This script checks for broken links in markdown files.
It identifies:
1. Broken internal links (links to other markdown files that don't exist)
2. Broken external links (HTTP links that return non-200 status codes)
3. Broken anchor links (links to sections that don't exist in the target file)

Usage:
    python link_checker.py [--directory PATH] [--output FILE] [--ignore PATTERN]

Options:
    --directory PATH    Directory containing markdown files (default: docs)
    --output FILE       Output file for the report (default: link-check-report.md)
    --ignore PATTERN    Regex pattern for URLs to ignore (can be used multiple times)
    --no-external       Skip checking external URLs (faster but less comprehensive)
    --verbose           Show detailed progress information
"""

import argparse
import concurrent.futures
import os
import re
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple, Union
from urllib.parse import unquote, urlparse

import requests
from requests.exceptions import RequestException

# Constants
DEFAULT_TIMEOUT = 10  # seconds
USER_AGENT = "GeneralDocumentationLinkChecker/1.0"
MARKDOWN_EXTENSIONS = {".md", ".markdown"}
ANCHOR_PATTERN = re.compile(r'^#+\s+(.+?)(?:\s+.*)?$', re.MULTILINE)
LINK_PATTERN = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
HTTP_OK_STATUSES = {200, 201, 202, 203, 204, 205, 206, 207, 208, 226}

# Cache for external URLs to avoid rechecking
external_url_cache = {}

# Cache for anchor links in files
anchor_cache = {}

# Global ignore patterns list
ignore_patterns = []


def setup_arg_parser():
    """Setup command line argument parser."""
    parser = argparse.ArgumentParser(description="Check for broken links in markdown files.")
    parser.add_argument(
        "--directory", default="docs", help="Directory containing markdown files"
    )
    parser.add_argument(
        "--output", default="link-check-report.md", help="Output file for the report"
    )
    parser.add_argument(
        "--ignore", action="append", default=[], help="Regex pattern for URLs to ignore"
    )
    parser.add_argument(
        "--no-external", action="store_true", help="Skip checking external URLs"
    )
    parser.add_argument(
        "--verbose", action="store_true", help="Show detailed progress information"
    )
    return parser


def should_ignore_url(url):
    """Check if URL should be ignored based on patterns."""
    global ignore_patterns
    for pattern in ignore_patterns:
        if re.search(pattern, url):
            return True
    return False


def normalize_path(path):
    """Normalize a file path for consistent checks."""
    return str(Path(path).resolve()).replace("\\", "/")


def find_all_markdown_files(directory):
    """Find all markdown files in the given directory recursively."""
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in MARKDOWN_EXTENSIONS):
                full_path = os.path.join(root, file)
                markdown_files.append(normalize_path(full_path))
    return markdown_files


def extract_links_from_file(file_path):
    """Extract all markdown links from a file."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    links = []
    matches = LINK_PATTERN.finditer(content)
    for match in matches:
        link_text, url = match.groups()
        # Skip image links for now (may add support later)
        if not url.startswith("!"):  
            # Handle URL encoding
            url = unquote(url.split(" ")[0])  # Handle cases where URL has a title
            links.append((link_text, url, match.start()))
    
    return links


def extract_anchors_from_file(file_path):
    """Extract all headings from a markdown file to validate anchor links."""
    if file_path in anchor_cache:
        return anchor_cache[file_path]
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        anchors = set()
        matches = ANCHOR_PATTERN.finditer(content)
        for match in matches:
            heading = match.group(1).strip()
            # Convert heading to anchor format (lowercase, spaces to hyphens)
            anchor = "#" + re.sub(r'[^a-zA-Z0-9\s-]', '', heading).lower().replace(' ', '-')
            anchors.add(anchor)
        
        anchor_cache[file_path] = anchors
        return anchors
    
    except Exception as e:
        print(f"Error extracting anchors from {file_path}: {e}")
        return set()


def check_internal_link(url, base_file):
    """Check if an internal link points to a valid file and anchor."""
    base_dir = os.path.dirname(base_file)
    
    # Split URL into file path and anchor
    if "#" in url:
        file_path, anchor = url.split("#", 1)
        anchor = f"#{anchor}"
    else:
        file_path, anchor = url, None
    
    # Handle empty file path (link to anchor in the same file)
    if not file_path:
        if anchor:
            anchors = extract_anchors_from_file(base_file)
            if anchor in anchors:
                return True, "Valid anchor link"
            else:
                return False, f"Anchor not found: {anchor}"
        return True, "Self-reference"
    
    # Normalize path
    if os.path.isabs(file_path):
        # Handle absolute paths (from repo root)
        full_path = os.path.normpath(file_path.lstrip("/"))
    else:
        # Handle relative paths
        full_path = os.path.normpath(os.path.join(base_dir, file_path))
    
    # Add .md extension if not present and file doesn't exist
    if not os.path.exists(full_path) and not os.path.splitext(full_path)[1]:
        full_path += ".md"
    
    # Check if file exists
    if not os.path.exists(full_path):
        return False, f"File not found: {full_path}"
    
    # Check anchor if present
    if anchor:
        anchors = extract_anchors_from_file(full_path)
        if anchor in anchors:
            return True, "Valid anchor link"
        else:
            return False, f"Anchor not found: {anchor} in file {full_path}"
    
    return True, "Valid file"


def check_external_link(url):
    """Check if an external link is reachable."""
    global external_url_cache
    
    # Check cache first
    if url in external_url_cache:
        return external_url_cache[url]
    
    try:
        # Special case for URLs that often cause issues
        if "mailto:" in url:
            return True, "Email link (not checked)"
        
        # Special case for GitHub links which often have rate limits
        if "github.com" in url:
            return True, "GitHub link (assumed valid)"
        
        # Print status
        print(f"Checking external URL: {url}", end="\r")
        
        # Make the request with a timeout
        response = requests.head(
            url, 
            timeout=DEFAULT_TIMEOUT,
            headers={"User-Agent": USER_AGENT},
            allow_redirects=True
        )
        
        # If head request fails, try GET request
        if response.status_code >= 400:
            response = requests.get(
                url, 
                timeout=DEFAULT_TIMEOUT,
                headers={"User-Agent": USER_AGENT},
                stream=True
            )
            # Close the connection without downloading the full response
            response.close()
        
        result = (response.status_code in HTTP_OK_STATUSES, 
                  f"HTTP Status: {response.status_code}")
        
        # Cache the result
        external_url_cache[url] = result
        return result
        
    except RequestException as e:
        result = (False, f"Request failed: {type(e).__name__}")
        external_url_cache[url] = result
        return result
    except Exception as e:
        result = (False, f"Error: {type(e).__name__}")
        external_url_cache[url] = result
        return result


def check_link(link_info, base_file):
    """Check if a link is valid."""
    link_text, url, position = link_info
    
    # Skip checking if the URL matches an ignore pattern
    if should_ignore_url(url):
        return True, link_text, url, position, "Ignored by pattern"
    
    # Parse the URL
    parsed_url = urlparse(url)
    
    # Check if it's an external link (has a scheme/netloc)
    if parsed_url.scheme or parsed_url.netloc:
        # Add scheme if missing but has netloc
        if not parsed_url.scheme and parsed_url.netloc:
            url = "https://" + url
            
        is_valid, reason = check_external_link(url)
    else:
        # Handle internal links
        is_valid, reason = check_internal_link(url, base_file)
    
    return is_valid, link_text, url, position, reason


def check_links_in_file(file_data, check_external=True):
    """Check all links in a single file."""
    file_path, links = file_data
    results = []
    
    for link_info in links:
        link_text, url, position = link_info
        
        # Skip external links if check_external is False
        parsed_url = urlparse(url)
        is_external = bool(parsed_url.scheme or parsed_url.netloc)
        
        if not check_external and is_external:
            results.append((True, link_text, url, position, "External link (skipped)"))
            continue
            
        # Check the link
        result = check_link(link_info, file_path)
        results.append(result)
    
    return file_path, results


def print_summary(all_results):
    """Print a summary of the results."""
    total_links = 0
    broken_links = 0
    
    for file_path, results in all_results:
        total_links += len(results)
        for is_valid, _, _, _, _ in results:
            if not is_valid:
                broken_links += 1
    
    print(f"\nChecked {total_links} links in {len(all_results)} files.")
    
    if broken_links == 0:
        print("🎉 All links are valid!")
    else:
        print(f"❌ Found {broken_links} broken links.")
        
    return total_links, broken_links


def group_results_by_file(all_results):
    """Group results by file for better reporting."""
    grouped = {}
    
    for file_path, results in all_results:
        # Skip files with no broken links
        has_broken = any(not is_valid for is_valid, _, _, _, _ in results)
        if has_broken:
            if file_path not in grouped:
                grouped[file_path] = []
            
            for is_valid, link_text, url, position, reason in results:
                if not is_valid:
                    grouped[file_path].append((position, link_text, url, reason))
    
    # Sort results by file name
    return {k: sorted(v, key=lambda x: x[0]) for k, v in sorted(grouped.items())}


def write_report(all_results, output_file):
    """Write a markdown report of the link check results."""
    total_links, broken_links = print_summary(all_results)
    grouped = group_results_by_file(all_results)
    
    with open(output_file, "w", encoding="utf-8") as f:
        # Write header
        f.write("# Link Check Report\n\n")
        f.write(f"*Generated on: {time.strftime('%Y-%m-%d %H:%M:%S')}*\n\n")
        
        # Write summary
        f.write("## Summary\n\n")
        f.write(f"Checked **{total_links}** links in **{len(all_results)}** files.\n\n")
        
        if broken_links == 0:
            f.write("🎉 All links are valid!\n\n")
        else:
            f.write(f"❌ Found **{broken_links}** broken links.\n\n")
            
            # Write details of broken links
            f.write("## Files with Issues\n\n")
            
            for file_path, issues in grouped.items():
                # Make the file path relative and nicer for display
                display_path = file_path.replace("\\", "/")
                
                f.write(f"### {display_path}\n\n")
                f.write("| Line | Status | Link Text | URL | Reason |\n")
                f.write("|------|--------|-----------|-----|--------|\n")
                
                # Find line numbers for each position
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                    
                for position, link_text, url, reason in issues:
                    # Find the line number for this position
                    line_number = content.count('\n', 0, position) + 1
                    
                    # Truncate long link text and URLs
                    link_text_display = (link_text[:40] + "...") if len(link_text) > 40 else link_text
                    url_display = (url[:40] + "...") if len(url) > 40 else url
                    
                    # Output the table row
                    f.write(f"| {line_number} | ❌ | {link_text_display} | {url_display} | {reason} |\n")
                
                f.write("\n")
    
    print(f"Report written to {output_file}")


def main():
    """Main function to run the link checker."""
    global ignore_patterns
    
    # Parse command line arguments
    parser = setup_arg_parser()
    args = parser.parse_args()
    
    # Compile ignore patterns
    ignore_patterns = [re.compile(pattern) for pattern in args.ignore]
    
    # Start timer
    start_time = time.time()
    
    # Find all markdown files
    if args.verbose:
        print(f"Searching for markdown files in {args.directory}...")
    
    markdown_files = find_all_markdown_files(args.directory)
    
    if args.verbose:
        print(f"Found {len(markdown_files)} markdown files.")
    
    # Extract links from all files
    links_by_file = []
    
    for file_path in markdown_files:
        links = extract_links_from_file(file_path)
        if links:
            links_by_file.append((file_path, links))
    
    if args.verbose:
        total_links = sum(len(links) for _, links in links_by_file)
        print(f"Found {total_links} links to check.")
        
        if not args.no_external:
            print("Checking both internal and external links...")
        else:
            print("Checking internal links only (external links skipped)...")
    
    # Check links in parallel
    all_results = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_file = {
            executor.submit(check_links_in_file, file_data, not args.no_external): file_data[0]
            for file_data in links_by_file
        }
        
        for future in concurrent.futures.as_completed(future_to_file):
            result = future.result()
            all_results.append(result)
    
    # Write report
    write_report(all_results, args.output)
    
    # End timer and show duration
    end_time = time.time()
    duration = end_time - start_time
    print(f"Check completed in {duration:.1f} seconds.")
    
    # Return exit code based on whether there are broken links
    _, broken_links = print_summary(all_results)
    
    if broken_links > 0:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())