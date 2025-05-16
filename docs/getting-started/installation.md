# Installation Guide

This guide will help you get started with SiteTracker's platform and tools.

<div class="grid cards" markdown>

- :material-download: **CLI Installation**  
  Install the SiteTracker command-line interface

- :material-account-key: **Account Setup**  
  Configure your SiteTracker account

- :material-api: **API Access**  
  Set up your API keys and credentials

- :material-cellphone: **Mobile Setup**  
  Configure SiteTracker mobile applications

</div>

## System Requirements

Before getting started, ensure your system meets these requirements:

| Component | Minimum Requirements | Recommended |
|-----------|----------------------|-------------|
| **Browser** | Chrome 90+, Firefox 90+, Edge 90+, Safari 14+ | Latest version |
| **Mobile OS** | iOS 14+, Android 10+ | Latest version |
| **CLI Requirements** | 2+ core processor, 4GB RAM | 4+ core, 8GB RAM |
| **Internet** | 5 Mbps connection | 20+ Mbps connection |

!!! note "Enterprise Requirements"
    For enterprise deployments with 50+ users, contact our [enterprise support team](mailto:enterprise@sitetracker.com) for specific infrastructure guidelines.

## SiteTracker CLI Installation

Our Command Line Interface (CLI) helps developers and advanced users automate workflows and integrate with SiteTracker.

=== "macOS"
    ### macOS Installation
    
    1. Install using Homebrew:
       ```bash
       brew install sitetracker-cli
       ```
       
    2. Verify the installation:
       ```bash
       sitetracker --version
       ```
       
    3. Configure your credentials:
       ```bash
       sitetracker configure
       ```
       
       You'll be prompted to enter your API key and other configuration details.
       
    4. Test the connection:
       ```bash
       sitetracker status
       ```

=== "Windows"
    ### Windows Installation
    
    1. Install using Chocolatey:
       ```powershell
       choco install sitetracker-cli
       ```
       
    2. Alternatively, download the installer from our [download page](https://developers.sitetracker.com/cli/download).
    
    3. Run the installer and follow the on-screen instructions.
    
    4. Open PowerShell and verify the installation:
       ```powershell
       sitetracker --version
       ```
       
    5. Configure your credentials:
       ```powershell
       sitetracker configure
       ```
       
       You'll be prompted to enter your API key and other configuration details.
       
    6. Test the connection:
       ```powershell
       sitetracker status
       ```

=== "Linux"
    ### Linux Installation
    
    1. Install using curl:
       ```bash
       curl -sSL https://get.sitetracker.com/cli | bash
       ```
       
    2. For Debian/Ubuntu, you can also use apt:
       ```bash
       sudo apt update
       sudo apt install sitetracker-cli
       ```
       
    3. Verify the installation:
       ```bash
       sitetracker --version
       ```
       
    4. Configure your credentials:
       ```bash
       sitetracker configure
       ```
       
       You'll be prompted to enter your API key and other configuration details.
       
    5. Test the connection:
       ```bash
       sitetracker status
       ```

## SiteTracker Account Setup

To get started with SiteTracker, you'll need to set up your account:

1. **Request Access**: If you don't have a SiteTracker account yet, [contact our sales team](https://www.sitetracker.com/request-demo/) to set up a demo or trial.

2. **Activate Your Account**: Once your account is created, you'll receive an email with activation instructions.

3. **Complete Your Profile**: Log in and complete your user profile, including contact information and preferences.

4. **Set Up Multi-Factor Authentication**: We recommend enabling MFA for additional security:
   
   a. Go to **My Profile > Security Settings**
   b. Click **Enable MFA**
   c. Follow the instructions to set up an authenticator app

## API Access Setup

To use the SiteTracker API or CLI, you'll need to set up API credentials:

1. **Generate API Key**:
   
   a. Log in to the SiteTracker web application
   b. Navigate to **Settings > API > API Keys**
   c. Click **Create New API Key**
   d. Name your key (e.g., "Development Integration")
   e. Select the appropriate permissions
   f. Click **Generate Key**
   
2. **Save Your Key Securely**:
   
   !!! warning "Security Notice"
       Your API key will only be displayed once. Store it securely in a password manager or secrets vault. Never commit API keys to source control or share them via email.

3. **Set Rate Limits (Optional)**:
   
   a. Go to **Settings > API > Rate Limits**
   b. Configure custom rate limits for your API keys if needed

## Mobile Application Setup

SiteTracker Mobile gives your field teams access to critical information on the go:

=== "iOS"
    1. Download SiteTracker Mobile from the [App Store](https://apps.apple.com/us/app/sitetracker-mobile/id1234567890)
    2. Open the app and enter your SiteTracker account URL
    3. Log in with your SiteTracker credentials
    4. Follow the prompts to allow necessary permissions (location, camera, etc.)
    5. Configure offline mode settings in **Settings > Offline Mode**

=== "Android"
    1. Download SiteTracker Mobile from the [Google Play Store](https://play.google.com/store/apps/details?id=com.sitetracker.mobile)
    2. Open the app and enter your SiteTracker account URL
    3. Log in with your SiteTracker credentials
    4. Follow the prompts to allow necessary permissions (location, camera, etc.)
    5. Configure offline mode settings in **Settings > Offline Mode**

## Next Steps

Now that you've installed and set up SiteTracker, you're ready to start using the platform. Check out these resources to get started:

- [Configuration Guide](configuration.md): Learn how to configure SiteTracker for your specific needs
- [API Documentation](../api/overview.md): Explore our API endpoints and integration options
- [User Training](https://university.sitetracker.com): Enroll in our online training courses (requires login)
- [Community Forum](https://community.sitetracker.com): Connect with other SiteTracker users

## Troubleshooting

If you encounter issues during installation:

- Check our [Knowledge Base](https://kb.sitetracker.com) for common solutions
- Review the [System Status Page](https://status.sitetracker.com) for any ongoing incidents
- Contact our [Support Team](mailto:support@sitetracker.com) with detailed information about your issue
       