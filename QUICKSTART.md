# Sitetracker Knowledge Base - Quickstart Guide

This guide provides the quickest way to get the Sitetracker Knowledge Base running on a fresh system.

## Prerequisites

- Python 3.11 or higher
- Git (to clone the repository)

## Quick Setup (5 Minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/sitetracker-kb.git
cd sitetracker-kb
```

### 2. Create and Activate a Virtual Environment (Recommended)

```bash
# Create a virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate
```

With a virtual environment active, you'll see `(venv)` at the beginning of your command prompt, indicating that any Python packages you install will be isolated to this project.

### 3. Install Dependencies

```bash
# Method 1: Install from pyproject.toml (might not work in all environments)
pip install -e .

# Method 2 (Recommended): Install packages directly
pip install mkdocs mkdocs-material mkdocs-minify-plugin pymdown-extensions mike

# Verify mkdocs installation
python -m mkdocs --version
```

The first command attempts to install all dependencies defined in the pyproject.toml file. If you encounter any "No module named mkdocs" errors, use Method 2 instead.

**Managing your virtual environment:**

- To exit the virtual environment when you're done:
  ```bash
  deactivate
  ```

- When returning to work on the project later, you only need to activate the virtual environment again—you don't need to recreate it or reinstall dependencies.

- If you prefer not to use a virtual environment, you can install directly:
  ```bash
  pip install mike mkdocs mkdocs-material mkdocs-minify-plugin pymdown-extensions
  ```
  However, this is not recommended as it may cause conflicts with other Python packages.

### 4. Run the Documentation Server

Make the build script executable (Linux/macOS users only):

```bash
chmod +x build.sh
```

Verify mkdocs is installed properly:

```bash
python -m mkdocs --version
```

Start the server in development mode:

```bash
# Using build script (recommended approach):
# On Linux/macOS:
./build.sh public site development serve

# On Windows (using Git Bash or similar):
sh build.sh public site development serve

# On Windows (using PowerShell):
bash build.sh public site development serve

# Alternative approach using mkdocs directly:
python -m mkdocs serve -f mkdocs.yml -a 0.0.0.0:5000

# Legacy method (if other approaches fail):
python -m mkdocs build -f mkdocs.yml -d site
cd site && python -m http.server 5000 --bind 0.0.0.0
```

The command explained:
- `public`: Builds the public version of the documentation (vs. internal)
- `site`: Sets the output directory for the built files
- `development`: Sets the environment type (shows environment indicators)
- `serve`: Starts a local web server to view the documentation

The site will be available at: http://0.0.0.0:5000

**To view both public and internal sites simultaneously:**

```bash
# Terminal 1: Run public site
./build.sh public site-public development serve 5000
# Alternative if you see "command not found" errors:
# python -m mkdocs build -f mkdocs.yml -d site-public
# cd site-public && python -m http.server 5000 --bind 0.0.0.0

# Terminal 2: Run internal site
./build.sh internal site-internal development serve 5001
# Alternative if you see "command not found" errors:
# python -m mkdocs build -f mkdocs.internal.yml -d site-internal
# cd site-internal && python -m http.server 5001 --bind 0.0.0.0
```

This lets you access public docs at http://0.0.0.0:5000 and internal docs at http://0.0.0.0:5001

## Troubleshooting

### Common Issues:

1. **Permission denied when running build.sh**
   ```bash
   chmod +x build.sh
   ```

2. **Python version issues**
   Ensure you're using Python 3.11 or higher:
   ```bash
   python --version
   ```

3. **Port is already in use**
   Start the server on a different port:
   ```bash
   ./build.sh public site development serve 8000
   ```

4. **Missing dependencies**
   If you see errors about missing packages:
   ```bash
   pip install -e .
   ```

5. **"mkdocs: command not found" error**
   Use the Python module syntax instead:
   ```bash
   python -m mkdocs build -f mkdocs.yml -d site
   # And to serve:
   cd site && python -m http.server 5000 --bind 0.0.0.0
   ```
   
   Or fix the build script:
   ```bash
   # Edit build.sh and replace all instances of "mkdocs" with "python -m mkdocs"
   # Then run the script normally
   ./build.sh public site development serve
   ```

### Platform-Specific Troubleshooting

#### macOS Troubleshooting

1. **First-time Python Setup for macOS**
   ```bash
   # Install Homebrew
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Python 3 and Node.js
   brew install python node
   
   # Make sure the correct Python is in your PATH
   echo 'export PATH="/usr/local/opt/python/libexec/bin:$PATH"' >> ~/.zshrc
   # Or for Bash users:
   # echo 'export PATH="/usr/local/opt/python/libexec/bin:$PATH"' >> ~/.bash_profile
   
   # Restart your shell or source the profile
   source ~/.zshrc  # or source ~/.bash_profile
   ```

2. **Python Command Issues on macOS**
   On macOS, you might need to use `python3` explicitly:
   ```bash
   python3 -m venv venv
   python3 -m pip install -e .
   python3 -m mkdocs build -f mkdocs.yml -d site
   ```

3. **Apple Silicon (M1/M2/M3) Macs**
   Some packages might have issues on Apple Silicon. Install Rosetta 2:
   ```bash
   softwareupdate --install-rosetta
   ```
   
   Then create your virtual environment with:
   ```bash
   # For native arm64 Python
   python3 -m venv venv
   
   # Or for x86_64 emulation if needed
   arch -x86_64 python3 -m venv venv
   ```

#### Linux Troubleshooting

1. **Package Installation Issues**
   If you're having trouble with dependencies on Linux:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install python3-dev python3-pip python3-venv build-essential
   
   # Fedora
   sudo dnf install python3-devel python3-pip
   
   # Arch Linux
   sudo pacman -S python-pip base-devel
   ```

2. **Python Module Not Found Errors**
   Ensure you're using the virtual environment:
   ```bash
   # Create and activate the virtual environment
   python3 -m venv venv
   source venv/bin/activate
   
   # Make sure pip is up to date
   pip install --upgrade pip
   
   # Install project dependencies
   pip install -e .
   ```

3. **Build Script Permission Issues**
   If you can't execute the build script:
   ```bash
   # Make script executable
   chmod +x build.sh
   
   # Run build
   ./build.sh public site development serve
   ```

4. **"mkdocs: command not found" Error**
   Use Python module syntax directly instead of relying on PATH.
   
   Option 1 (Build and serve in one command):
   ```bash
   # Build and serve with Python module syntax
   python3 -m mkdocs serve -f mkdocs.yml -a 0.0.0.0:5000
   ```
   
   Option 2 (Build and serve separately):
   ```bash
   # Build with Python module syntax
   python3 -m mkdocs build -f mkdocs.yml -d site
   
   # Start server manually
   cd site && python3 -m http.server 5000 --bind 0.0.0.0
   ```
   
   The first option is simpler as it combines building and serving in one command.
   
5. **Edit the Build Script**
   If you keep experiencing "command not found" errors, you can edit the build.sh file:
   ```bash
   # Open build.sh in an editor (e.g., nano, vim, or gedit)
   nano build.sh
   
   # Find lines with "mkdocs build" and replace with "python -m mkdocs build"
   # Save the file
   
   # Make executable and run
   chmod +x build.sh
   ./build.sh public site development serve
   ```

## What's Next?

- Read the full [README.md](README.md) for more detailed information
- Explore the [SETUP.md](SETUP.md) for advanced configuration options
- Start editing documentation in the `docs/` directory

## Quick Customization Tips

1. **Site Title & Logo**: Edit `mkdocs.yml` to change the site name and logo
2. **Custom Styling**: Modify `docs/assets/stylesheets/extra.css` 
3. **JavaScript Functionality**: Edit `docs/assets/javascripts/extra.js`
4. **Navigation Structure**: Update the `nav` section in `mkdocs.yml`

## Documentation Quality Tools

### Markdown Linting

This project includes markdownlint for consistent documentation formatting:

```bash
# Run the linting script (offers to fix issues)
./lint.sh

# Check markdown issues only
npm run lint

# Fix common markdown issues automatically
npm run lint:fix
```

See the [Markdown Style Guide](docs/internal/markdown-guide.md) for complete guidelines.