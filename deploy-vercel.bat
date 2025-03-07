@echo off
echo Vercel Deployment Tool for Household Task Tracker
echo ===============================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Vercel CLI not found. Installing...
  npm install -g vercel
)

REM Check if user is logged in to Vercel
echo Checking Vercel login status...
vercel whoami >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Please log in to your Vercel account:
  vercel login
)

echo.
echo Deployment Options:
echo ------------------
echo 1. Deploy from local directory (current project)
echo 2. Deploy from GitHub repository
echo.
set /p deploy_option=Enter your choice (1-2) [1]: 

if "%deploy_option%"=="" (
  set deploy_option=1
)

if "%deploy_option%"=="1" (
  echo.
  echo Deploying from local directory...
  
  echo.
  set /p setup_env=Do you want to set up environment variables now? (y/n) [y]: 
  if /i "%setup_env%"=="" set setup_env=y
  
  if /i "%setup_env%"=="y" (
    echo.
    echo Setting up environment variables for Vercel deployment...
    echo These will be securely stored in your Vercel project.
    echo.
    
    set /p nextauth_url=Enter NEXTAUTH_URL (e.g., https://your-app.vercel.app): 
    if "%nextauth_url%"=="" set nextauth_url=https://home-task-tracker.vercel.app
    
    set /p nextauth_secret=Enter NEXTAUTH_SECRET: 
    
    set /p google_client_id=Enter GOOGLE_CLIENT_ID: 
    
    set /p google_client_secret=Enter GOOGLE_CLIENT_SECRET: 
    
    echo.
    echo Running Vercel deployment with environment variables...
    vercel --env NEXTAUTH_URL=%nextauth_url% --env NEXTAUTH_SECRET=%nextauth_secret% --env GOOGLE_CLIENT_ID=%google_client_id% --env GOOGLE_CLIENT_SECRET=%google_client_secret%
  ) else (
    echo.
    echo Running Vercel deployment...
    vercel
  )
) else if "%deploy_option%"=="2" (
  echo.
  echo Deploying from GitHub repository...
  
  REM Check if git is installed
  where git >nul 2>nul
  if %ERRORLEVEL% neq 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/downloads
    pause
    exit /b 1
  )
  
  REM Check if the directory is a git repository
  if not exist .git (
    echo This directory is not a Git repository.
    echo Please run the GitHub deployment script first to set up your repository.
    pause
    exit /b 1
  )
  
  REM Get the GitHub repository URL
  for /f "tokens=*" %%a in ('git config --get remote.origin.url') do set repo_url=%%a
  
  if "%repo_url%"=="" (
    echo No GitHub remote repository found.
    echo Please run the GitHub deployment script first to set up your repository.
    pause
    exit /b 1
  )
  
  echo Found GitHub repository: %repo_url%
  echo.
  echo Importing project from GitHub to Vercel...
  vercel link
  
  echo.
  set /p setup_env=Do you want to set up environment variables now? (y/n) [y]: 
  if /i "%setup_env%"=="" set setup_env=y
  
  if /i "%setup_env%"=="y" (
    echo.
    echo Setting up environment variables for Vercel deployment...
    echo These will be securely stored in your Vercel project.
    echo.
    
    set /p nextauth_url=Enter NEXTAUTH_URL (e.g., https://your-app.vercel.app): 
    if "%nextauth_url%"=="" set nextauth_url=https://home-task-tracker.vercel.app
    
    set /p nextauth_secret=Enter NEXTAUTH_SECRET: 
    
    set /p google_client_id=Enter GOOGLE_CLIENT_ID: 
    
    set /p google_client_secret=Enter GOOGLE_CLIENT_SECRET: 
    
    echo.
    echo Setting environment variables...
    vercel env add NEXTAUTH_URL production
    vercel env add NEXTAUTH_SECRET production
    vercel env add GOOGLE_CLIENT_ID production
    vercel env add GOOGLE_CLIENT_SECRET production
  )
  
  echo.
  echo Deploying from GitHub repository...
  vercel
)

echo.
echo Vercel deployment process completed!
echo.
echo Post-Deployment Steps:
echo 1. Verify your application is working at the Vercel URL
echo 2. Update your Google OAuth credentials with the new URL if needed
echo 3. Test the authentication and real-time functionality
echo.
pause 