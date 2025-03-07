# Simple Vercel Deployment Script (PowerShell)
Write-Host "Vercel Deployment Tool for Household Task Tracker" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = $null
try {
    $vercelInstalled = Get-Command vercel -ErrorAction Stop
    Write-Host "Vercel CLI is installed at: $($vercelInstalled.Source)" -ForegroundColor Green
} catch {
    Write-Host "Vercel CLI is not installed or not in your PATH." -ForegroundColor Red
    Write-Host ""
    
    $installVercel = Read-Host "Would you like to install Vercel CLI now? (y/n)"
    if ($installVercel -eq "y") {
        Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
        
        Write-Host ""
        Write-Host "Vercel CLI has been installed. Refreshing environment variables..." -ForegroundColor Green
        
        # Refresh environment variables without restarting PowerShell
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        # Try to find Vercel again
        try {
            $vercelInstalled = Get-Command vercel -ErrorAction Stop
            Write-Host "Vercel CLI is now available at: $($vercelInstalled.Source)" -ForegroundColor Green
        } catch {
            Write-Host "Vercel CLI installation completed, but we still can't find it in your PATH." -ForegroundColor Red
            Write-Host "Please restart your PowerShell window and run this script again." -ForegroundColor Red
            Read-Host "Press Enter to exit"
            exit 1
        }
    } else {
        Write-Host "Please install Vercel CLI with 'npm install -g vercel' and run this script again." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check if user is logged in to Vercel
Write-Host "Checking Vercel login status..." -ForegroundColor Yellow
$loginStatus = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "You are not logged in to Vercel." -ForegroundColor Red
    Write-Host "Please log in to your Vercel account:" -ForegroundColor Yellow
    vercel login
}

# Deployment Options
Write-Host ""
Write-Host "Deployment Options:" -ForegroundColor Cyan
Write-Host "------------------" -ForegroundColor Cyan
Write-Host "1. Deploy from local directory (current project)" -ForegroundColor White
Write-Host "2. Deploy from GitHub repository" -ForegroundColor White
Write-Host ""
$deployOption = Read-Host "Enter your choice (1-2) [1]"

if ([string]::IsNullOrWhiteSpace($deployOption)) {
    $deployOption = "1"
}

if ($deployOption -eq "1") {
    Write-Host ""
    Write-Host "Deploying from local directory..." -ForegroundColor Yellow
    
    Write-Host ""
    $setupEnv = Read-Host "Do you want to set up environment variables now? (y/n) [y]"
    if ([string]::IsNullOrWhiteSpace($setupEnv)) {
        $setupEnv = "y"
    }
    
    if ($setupEnv -eq "y") {
        Write-Host ""
        Write-Host "Setting up environment variables for Vercel deployment..." -ForegroundColor Yellow
        Write-Host "These will be securely stored in your Vercel project." -ForegroundColor Yellow
        Write-Host ""
        
        $nextauthUrl = Read-Host "Enter NEXTAUTH_URL (e.g., https://your-app.vercel.app)"
        if ([string]::IsNullOrWhiteSpace($nextauthUrl)) {
            $nextauthUrl = "https://home-task-tracker.vercel.app"
        }
        
        $nextauthSecret = Read-Host "Enter NEXTAUTH_SECRET"
        
        Write-Host ""
        Write-Host "Running Vercel deployment with environment variables..." -ForegroundColor Green
        
        # Create a temporary .env file for deployment
        $envContent = @"
NEXTAUTH_URL=$nextauthUrl
NEXTAUTH_SECRET=$nextauthSecret
"@
        
        $envFile = ".env.vercel.local"
        $envContent | Out-File -FilePath $envFile -Encoding utf8
        
        # Deploy with environment variables
        vercel --env-file $envFile
        
        # Clean up temporary file
        Remove-Item $envFile -Force
    } else {
        Write-Host ""
        Write-Host "Running Vercel deployment..." -ForegroundColor Green
        vercel
    }
} elseif ($deployOption -eq "2") {
    Write-Host ""
    Write-Host "Deploying from GitHub repository..." -ForegroundColor Yellow
    
    # Check if git is installed
    $gitInstalled = $null
    try {
        $gitInstalled = Get-Command git -ErrorAction Stop
    } catch {
        Write-Host "Git is not installed or not in your PATH." -ForegroundColor Red
        Write-Host "Please install Git from https://git-scm.com/downloads" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    # Check if the directory is a git repository
    if (-not (Test-Path ".git")) {
        Write-Host "This directory is not a Git repository." -ForegroundColor Red
        Write-Host "Please run the GitHub deployment script first to set up your repository." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    # Get the GitHub repository URL
    $repoUrl = git config --get remote.origin.url
    
    if ([string]::IsNullOrWhiteSpace($repoUrl)) {
        Write-Host "No GitHub remote repository found." -ForegroundColor Red
        Write-Host "Please run the GitHub deployment script first to set up your repository." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Host "Found GitHub repository: $repoUrl" -ForegroundColor Green
    Write-Host ""
    Write-Host "Importing project from GitHub to Vercel..." -ForegroundColor Yellow
    vercel link
    
    Write-Host ""
    $setupEnv = Read-Host "Do you want to set up environment variables now? (y/n) [y]"
    if ([string]::IsNullOrWhiteSpace($setupEnv)) {
        $setupEnv = "y"
    }
    
    if ($setupEnv -eq "y") {
        Write-Host ""
        Write-Host "Setting up environment variables for Vercel deployment..." -ForegroundColor Yellow
        Write-Host "These will be securely stored in your Vercel project." -ForegroundColor Yellow
        Write-Host ""
        
        $nextauthUrl = Read-Host "Enter NEXTAUTH_URL (e.g., https://your-app.vercel.app)"
        if ([string]::IsNullOrWhiteSpace($nextauthUrl)) {
            $nextauthUrl = "https://home-task-tracker.vercel.app"
        }
        
        $nextauthSecret = Read-Host "Enter NEXTAUTH_SECRET"
        
        Write-Host ""
        Write-Host "Setting environment variables..." -ForegroundColor Green
        vercel env add NEXTAUTH_URL production
        vercel env add NEXTAUTH_SECRET production
    }
    
    Write-Host ""
    Write-Host "Deploying from GitHub repository..." -ForegroundColor Green
    vercel
}

Write-Host ""
Write-Host "Vercel deployment process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Post-Deployment Steps:" -ForegroundColor Cyan
Write-Host "1. Verify your application is working at the Vercel URL" -ForegroundColor White
Write-Host "2. Update your Google OAuth credentials with the new URL if needed" -ForegroundColor White
Write-Host "3. Test the authentication and real-time functionality" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit" 