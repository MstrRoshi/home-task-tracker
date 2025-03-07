# GitHub Repository Setup Tool (PowerShell Version)
Write-Host "GitHub Repository Setup Tool (PowerShell Version)" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will help you set up and push your Household Task Tracker to GitHub."
Write-Host ""

# Check if Git is installed
$gitInstalled = $null
try {
    $gitInstalled = Get-Command git -ErrorAction Stop
    Write-Host "Git is installed at: $($gitInstalled.Source)" -ForegroundColor Green
} catch {
    Write-Host "Git is not installed or not in your PATH." -ForegroundColor Red
    Write-Host ""
    
    $installGit = Read-Host "Would you like to install Git now? (y/n)"
    if ($installGit -eq "y") {
        Write-Host "Installing Git using winget..." -ForegroundColor Yellow
        winget install --id Git.Git -e --source winget
        
        Write-Host ""
        Write-Host "Git has been installed. Refreshing environment variables..." -ForegroundColor Green
        
        # Refresh environment variables without restarting PowerShell
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        # Try to find Git again
        try {
            $gitInstalled = Get-Command git -ErrorAction Stop
            Write-Host "Git is now available at: $($gitInstalled.Source)" -ForegroundColor Green
        } catch {
            Write-Host "Git installation completed, but we still can't find it in your PATH." -ForegroundColor Red
            Write-Host "Please restart your PowerShell window and run this script again." -ForegroundColor Red
            Read-Host "Press Enter to exit"
            exit 1
        }
    } else {
        Write-Host "Please install Git from https://git-scm.com/downloads and run this script again." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check if the directory is already a git repository
if (Test-Path ".git") {
    Write-Host "This directory is already a Git repository." -ForegroundColor Yellow
    
    # Check current branch
    $currentBranch = git branch --show-current
    Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Green
    git init
    
    # Create initial commit if needed
    Write-Host "Creating initial commit..." -ForegroundColor Green
    git add .
    git commit -m "Initial commit"
    
    # Check current branch
    $currentBranch = git branch --show-current
    Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow
    
    # Rename branch to main if it's master (GitHub standard)
    if ($currentBranch -eq "master") {
        Write-Host "Renaming default branch from 'master' to 'main'..." -ForegroundColor Yellow
        git branch -M main
        $currentBranch = "main"
        Write-Host "Branch renamed to: $currentBranch" -ForegroundColor Green
    }
}

# Ask for repository details
$repoName = Read-Host "Enter your GitHub repository name (e.g., household-task-tracker)"
$username = Read-Host "Enter your GitHub username"

# Verify GitHub repository exists
Write-Host ""
Write-Host "Verifying GitHub repository exists..." -ForegroundColor Yellow
$repoExists = $false
try {
    $response = Invoke-WebRequest -Uri "https://github.com/$username/$repoName" -Method Head -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $repoExists = $true
        Write-Host "Repository found at https://github.com/$username/$repoName" -ForegroundColor Green
    }
} catch {
    Write-Host "Repository not found at https://github.com/$username/$repoName" -ForegroundColor Red
    Write-Host "Please create the repository on GitHub before continuing." -ForegroundColor Yellow
    Write-Host "Go to: https://github.com/new" -ForegroundColor Yellow
    
    $createRepo = Read-Host "Would you like to open the GitHub new repository page in your browser? (y/n)"
    if ($createRepo -eq "y") {
        Start-Process "https://github.com/new"
    }
    
    $waitForRepo = Read-Host "Press Enter when you've created the repository"
}

# Add all files to git
Write-Host "Adding files to Git..." -ForegroundColor Green
git add .

# Commit changes
$commitMessage = Read-Host "Enter a commit message (or press Enter for default message)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit of Household Task Tracker"
}
git commit -m $commitMessage

# Set up remote repository
Write-Host "Setting up remote repository..." -ForegroundColor Green
$remoteExists = $false
try {
    $remoteOutput = git remote -v
    if ($remoteOutput -match "origin") {
        $remoteExists = $true
        Write-Host "Current remote configuration:" -ForegroundColor Yellow
        Write-Host $remoteOutput -ForegroundColor Yellow
    }
} catch {
    # No remotes exist
}

if (-not $remoteExists) {
    Write-Host "Adding remote 'origin' as https://github.com/$username/$repoName.git" -ForegroundColor Green
    git remote add origin "https://github.com/$username/$repoName.git"
} else {
    Write-Host "Remote 'origin' already exists." -ForegroundColor Yellow
    $changeRemote = Read-Host "Do you want to update the remote URL? (y/n)"
    if ($changeRemote -eq "y") {
        Write-Host "Updating remote 'origin' to https://github.com/$username/$repoName.git" -ForegroundColor Green
        git remote set-url origin "https://github.com/$username/$repoName.git"
    }
}

# Configure Git credentials if needed
$configureCredentials = Read-Host "Do you want to configure Git credentials for this push? (y/n)"
if ($configureCredentials -eq "y") {
    $gitEmail = Read-Host "Enter your GitHub email"
    $gitName = Read-Host "Enter your name for Git commits"
    
    git config user.email $gitEmail
    git config user.name $gitName
    
    Write-Host "Git credentials configured." -ForegroundColor Green
}

# Push to GitHub
Write-Host ""
Write-Host "Ready to push to GitHub." -ForegroundColor Green
Write-Host "Before continuing, please ensure you have:" -ForegroundColor Yellow
Write-Host "1. Created a repository named '$repoName' on GitHub" -ForegroundColor Yellow
Write-Host "2. Have proper authentication set up (GitHub credentials or SSH key)" -ForegroundColor Yellow
Write-Host ""
$continue = Read-Host "Continue with push to GitHub? (y/n)"

if ($continue -eq "y") {
    Write-Host "Pushing to GitHub..." -ForegroundColor Green
    
    # Get current branch
    $currentBranch = git branch --show-current
    Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow
    
    # Try pushing with verbose output
    Write-Host "Running: git push -v -u origin $currentBranch" -ForegroundColor Yellow
    $pushOutput = git push -v -u origin $currentBranch 2>&1
    $pushSuccess = $?
    
    Write-Host "Push output:" -ForegroundColor Yellow
    Write-Host $pushOutput -ForegroundColor Gray
    
    if (-not $pushSuccess) {
        Write-Host ""
        Write-Host "Push failed. This could be due to:" -ForegroundColor Red
        Write-Host "- The repository doesn't exist on GitHub yet" -ForegroundColor Red
        Write-Host "- Authentication issues" -ForegroundColor Red
        Write-Host "- Branch naming issues" -ForegroundColor Red
        Write-Host ""
        
        # Try alternative authentication method
        $tryAlternative = Read-Host "Would you like to try an alternative authentication method? (y/n)"
        if ($tryAlternative -eq "y") {
            Write-Host "Trying alternative authentication method..." -ForegroundColor Yellow
            
            # Generate a personal access token
            Write-Host "You'll need to create a Personal Access Token on GitHub:" -ForegroundColor Yellow
            Write-Host "1. Go to https://github.com/settings/tokens" -ForegroundColor Yellow
            Write-Host "2. Click 'Generate new token'" -ForegroundColor Yellow
            Write-Host "3. Give it a name like 'Household Task Tracker Deployment'" -ForegroundColor Yellow
            Write-Host "4. Select 'repo' scope" -ForegroundColor Yellow
            Write-Host "5. Click 'Generate token'" -ForegroundColor Yellow
            Write-Host "6. Copy the token (you won't see it again!)" -ForegroundColor Yellow
            
            $openTokenPage = Read-Host "Would you like to open the token page in your browser? (y/n)"
            if ($openTokenPage -eq "y") {
                Start-Process "https://github.com/settings/tokens"
            }
            
            $token = Read-Host "Enter your Personal Access Token" -AsSecureString
            $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
            $tokenPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
            
            # Update remote URL with token
            $tokenUrl = "https://$username`:$tokenPlain@github.com/$username/$repoName.git"
            git remote set-url origin $tokenUrl
            
            # Try pushing again
            Write-Host "Trying push with token authentication..." -ForegroundColor Yellow
            $pushOutput = git push -v -u origin $currentBranch 2>&1
            $pushSuccess = $?
            
            # Reset remote URL to remove token (security)
            git remote set-url origin "https://github.com/$username/$repoName.git"
            
            if ($pushSuccess) {
                Write-Host ""
                Write-Host "Successfully pushed to GitHub with token authentication!" -ForegroundColor Green
                Write-Host "Your repository is now available at: https://github.com/$username/$repoName" -ForegroundColor Green
            } else {
                Write-Host ""
                Write-Host "Push still failed. Please check the output above for specific errors." -ForegroundColor Red
            }
        }
        
        Write-Host ""
        Write-Host "Please create the repository on GitHub first at:" -ForegroundColor Yellow
        Write-Host "https://github.com/new" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Then try running this script again." -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "Your repository is now available at: https://github.com/$username/$repoName" -ForegroundColor Green
    }
} else {
    Write-Host "Push cancelled." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit" 