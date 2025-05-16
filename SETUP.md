# Sitetracker Knowledge Base Setup Guide

This document provides detailed instructions for setting up and running the Sitetracker Knowledge Base after cloning the repository.

## Dependencies

The project requires the following dependencies (all defined in the pyproject.toml):

```
mike>=2.1.3
mkdocs>=1.6.1
mkdocs-material>=9.6.13
mkdocs-minify-plugin>=0.8.0
pymdown-extensions>=10.15
```

### Installation Options

The recommended approach is to use a virtual environment, but you can choose from the following methods to install the required dependencies:

#### Recommended Method: Using a Python Virtual Environment

Using a virtual environment is strongly recommended to avoid dependency conflicts:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies from the project
pip install -e .
```

#### Alternative Installation Methods

If you prefer not to use a virtual environment, you can use one of these methods instead (not recommended):

**Direct pip installation:**
```bash
pip install mkdocs mkdocs-material mkdocs-minify-plugin pymdown-extensions mike
```

**Install from pyproject.toml:**
```bash
pip install -e .
```

### Virtual Environment Management

#### Deactivating the Environment

When you're done working with the project, you can deactivate the virtual environment:

```bash
deactivate
```

#### Returning to the Project Later

When returning to work on the project, you just need to activate the virtual environment again:

```bash
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

#### Upgrading Dependencies

To upgrade all dependencies to their latest versions within the virtual environment:

```bash
pip install --upgrade -e .
```

#### Creating Requirements File

If you need to share your exact environment with others:

```bash
pip freeze > requirements-dev.txt
```

Others can then recreate your exact environment:

```bash
pip install -r requirements-dev.txt
```

## Running the Documentation Site

After installing dependencies, you can run the documentation site locally using the provided build script.

### Using the build.sh Script

The repository includes a convenient build script that handles environment configuration and server startup.

1. Make the script executable (if needed):
   ```bash
   chmod +x build.sh
   ```

2. Run the documentation server in development mode:
   ```bash
   ./build.sh public site development serve
   ```

This command will:
- Build the public documentation
- Set the environment to "development" (showing the environment banner)
- Serve the site at http://0.0.0.0:5000

### Script Options

The build script supports various configuration options:

```bash
./build.sh [external|internal] [output_directory] [environment] [serve] [port] [server_address]
```

Parameters:
- **Build Type**: `external` or `internal` (default: `external`)
  - `external`: Only external/public content
  - `internal`: Includes both external and internal content
- **Output Directory**: Where to save the built site (default: `site`)
- **Environment**: `development`, `staging`, or `production` (default: `production`)
- **Serve**: Add `serve` to start a local server
- **Port**: Server port when using `serve` (default: `8001` for external, `8000` for internal)
- **Server Address**: IP address to bind the server to (default: `0.0.0.0`)

Examples:

```bash
# External docs in development mode at port 8001
./build.sh external site development serve 8001

# Internal docs in staging environment
./build.sh internal site-internal staging serve 8000

# Build production-ready external docs without serving
./build.sh external site production

# External docs using localhost only (127.0.0.1)
./build.sh external site development serve 8001 127.0.0.1

# Internal docs using localhost only (127.0.0.1)
./build.sh internal site-internal development serve 8000 127.0.0.1
```

### Alternative: Direct MkDocs Commands

If you prefer, you can use MkDocs commands directly:

```bash
# Serve the documentation with hot-reloading (public content)
mkdocs serve

# Build the documentation (public content)
mkdocs build

# Serve internal documentation
mkdocs serve -f mkdocs.internal.yml
```

Note: Using direct MkDocs commands bypasses the environment configuration from the build script.

## Running Both Public and Internal Versions Simultaneously

To view both the public and internal documentation at the same time, you'll need to:

1. Open two separate terminal windows/tabs
2. Run each server with a different output directory and port
3. Access each site via its respective URL

### Step-by-Step Instructions:

#### Terminal 1: Run the External Version
```bash
# Create a dedicated output directory for external docs
mkdir -p site

# Run the external server on port 8001
./build.sh external site development serve 8001
```

#### Terminal 2: Run the Internal Version
```bash
# Create a dedicated output directory for internal docs
mkdir -p site-internal

# Run the internal server on port 8000
./build.sh internal site-internal development serve 8000
```

#### Optional: Using 127.0.0.1 Instead of 0.0.0.0

To restrict access to the local machine only:

```bash
# External docs on localhost only
./build.sh external site development serve 8001 127.0.0.1

# Internal docs on localhost only
./build.sh internal site-internal development serve 8000 127.0.0.1
```

Now you can access:
- External documentation: http://0.0.0.0:8001 (or http://127.0.0.1:8001 if using localhost only)
- Internal documentation: http://0.0.0.0:8000 (or http://127.0.0.1:8000 if using localhost only)

### Using Browser Tabs/Windows

For efficient workflow, you can:
- Keep both browser tabs open side by side
- Use browser bookmarks for quick access to both versions
- Use a browser extension like "Tab Manager" to group related tabs

## Folder Structure

- `docs/` - Main documentation content
  - `assets/` - Images, CSS, JavaScript files
    - `stylesheets/` - CSS files including `extra.css` for custom styling
    - `javascripts/` - JS files including environment handling
  - `internal/` - Content only visible in internal builds
  - `overrides/` - Theme customization templates
- `site/` - Generated documentation (not committed to git)
- `mkdocs.yml` - Public documentation configuration
- `mkdocs.internal.yml` - Internal documentation configuration
- `build.sh` - Helper script for building different documentation versions

## Framework Selection: MkDocs with Material Theme

The Sitetracker Knowledge Base is built using MkDocs with the Material theme. This combination provides the best balance of features and customizability.

### Why Material Theme vs. Plain MkDocs

Starting with plain MkDocs without the Material theme would have been simpler for basic customizations, but it would have come with significant tradeoffs.

Using plain MkDocs would have made it easier to:
- Create custom header layouts without battling complex theme structures
- Add environment indicators with more straightforward positioning
- Have fewer JavaScript dependencies that can cause console errors
- Create simpler templates with less hierarchy

However, the Material theme provides many advantages that would be difficult to replicate:
- Responsive design that works well on mobile devices
- Built-in search functionality with advanced features
- Dark/light mode switching
- Navigation enhancements (collapsible sections, sticky headers)
- Attractive styling and typography out of the box
- Admonition blocks and other content formatting options
- Version selector framework that we've been able to customize

For Sitetracker's Knowledge Base, the Material theme offers a professional look and many features that would require significant custom development if starting from plain MkDocs. The customization challenges we've faced are a reasonable trade-off for the rich features and polished appearance the theme provides.

## Enhanced Search with Algolia DocSearch

The Sitetracker Knowledge Base supports integration with Algolia DocSearch for a superior search experience. This is currently configured but requires Algolia API credentials to activate.

To implement Algolia DocSearch:

1. Obtain Algolia API credentials (see [docs/internal/algolia-setup.md](docs/internal/algolia-setup.md) for detailed instructions)
2. Uncomment and update the Algolia configuration in the `mkdocs.yml` file
3. Set up environment variables for your credentials
4. Deploy with the environment variables configured

For complete implementation details, see the [Algolia setup guide](docs/internal/algolia-setup.md).

## Version Deployment

This project is configured to use [Mike](https://github.com/jimporter/mike) for managing multiple versions of documentation. To deploy a new version:

```bash
# Deploy version 1.0.0 as "latest"
mike deploy 1.0.0 latest

# Set default version
mike set-default latest
```

## Environment-Based Content Control

The documentation site includes features to control content visibility based on the environment:

- **Development/Staging**: All content visible with environment indicators
- **Production**: Internal content hidden in public builds

Internal-only content can be marked using the `internal-only` CSS class:

```html
<div class="internal-only">
This content is only visible in internal builds or non-production environments.
</div>
```

## Changing Server Address from 0.0.0.0 to 127.0.0.1

By default, the documentation server runs on `0.0.0.0`, which makes it accessible from any network interface. In some environments, you might want to restrict access to localhost only by using `127.0.0.1` instead.

### Method 1: Modifying the build.sh Script (Recommended)

This method involves editing the `build.sh` script to use 127.0.0.1 by default:

1. Open the `build.sh` file in a text editor
2. Locate the section that starts the MkDocs server (look for `mkdocs serve`)
3. Replace `0.0.0.0` with `127.0.0.1` in the command arguments:

```bash
# Find this line
mkdocs serve -f "${CONFIG_FILE}" --dev-addr="0.0.0.0:${PORT}" -w docs -w "${CONFIG_FILE}"

# Change to this
mkdocs serve -f "${CONFIG_FILE}" --dev-addr="127.0.0.1:${PORT}" -w docs -w "${CONFIG_FILE}"
```

4. Save the file and run the build script normally

### Method 2: Using the --dev-addr Option with Direct MkDocs Commands

If you're using MkDocs commands directly (without the build script):

```bash
# For public docs
mkdocs serve --dev-addr="127.0.0.1:8001"

# For internal docs
mkdocs serve -f mkdocs.internal.yml --dev-addr="127.0.0.1:8000"
```

### Method 3: Override at Runtime with the Build Script

You can also override the address when running the build script by modifying the command:

```bash
# For external docs on 127.0.0.1 port 8001
./build.sh external site development serve 8001 127.0.0.1

# For internal docs on 127.0.0.1 port 8000
./build.sh internal site-internal development serve 8000 127.0.0.1
```

Note: For this method to work, the build.sh script needs to be updated to accept an additional parameter for the address.

### Method 4: Using Environment Variables

You can set environment variables before running MkDocs:

```bash
# Set the environment variable
export MKDOCS_DEV_ADDR="127.0.0.1:8001"

# Run MkDocs
mkdocs serve
```

### Implications of Using 127.0.0.1

When using `127.0.0.1` instead of `0.0.0.0`:

1. **Accessibility**: The server will only be accessible from the local machine, not from other devices on the network.
2. **Security**: This provides additional security by preventing external access to your development server.
3. **Container Environments**: In containerized environments (Docker, etc.), using `127.0.0.1` may prevent access to the server from outside the container. In these cases, stick with `0.0.0.0`.
4. **Replit Environment**: For Replit, using `0.0.0.0` is recommended for proper operation.

### Troubleshooting Access Issues

If you change to `127.0.0.1` and have trouble accessing the server:

1. Ensure you're trying to access the server from the same machine it's running on
2. Try accessing via `localhost:PORT` instead of the IP address
3. Check if any firewalls or security software might be blocking the connection
4. If using virtual machines or containers, you might need to use `0.0.0.0` instead