@echo off
echo GitHub Repository Setup Tool
echo ===========================
echo.
echo This script will help you set up and push your Household Task Tracker to GitHub.
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Git is not installed or not in your PATH.
  echo.
  echo If you just installed Git, you need to restart your terminal or command prompt.
  echo.
  echo Please do the following:
  echo 1. Close this terminal/command prompt
  echo 2. Open a new terminal/command prompt
  echo 3. Navigate back to this directory
  echo 4. Run this script again
  echo.
  echo If Git is not installed, please install it from https://git-scm.com/downloads
  pause
  exit /b 1
)

REM Check if the directory is already a git repository
if exist .git (
  echo This directory is already a Git repository.
) else (
  echo Initializing Git repository...
  git init
)

REM Ask for repository details
set /p repo_name=Enter your GitHub repository name (e.g., household-task-tracker): 
set /p username=Enter your GitHub username: 

REM Add all files to git
echo Adding files to Git...
git add .

REM Commit changes
set /p commit_message=Enter a commit message (or press Enter for default message): 
if "%commit_message%"=="" (
  set commit_message=Initial commit of Household Task Tracker
)
git commit -m "%commit_message%"

REM Set up remote repository
echo Setting up remote repository...
git remote -v | findstr "origin" >nul
if %ERRORLEVEL% neq 0 (
  git remote add origin https://github.com/%username%/%repo_name%.git
) else (
  echo Remote 'origin' already exists.
  set /p change_remote=Do you want to update the remote URL? (y/n): 
  if /i "%change_remote%"=="y" (
    git remote set-url origin https://github.com/%username%/%repo_name%.git
  )
)

REM Push to GitHub
echo.
echo Ready to push to GitHub.
echo Before continuing, please ensure you have:
echo 1. Created a repository named '%repo_name%' on GitHub
echo 2. Have proper authentication set up (GitHub credentials or SSH key)
echo.
set /p continue=Continue with push to GitHub? (y/n): 

if /i "%continue%"=="y" (
  echo Pushing to GitHub...
  git push -u origin main
  if %ERRORLEVEL% neq 0 (
    echo Failed to push to main branch. Trying master branch...
    git push -u origin master
  )
  
  if %ERRORLEVEL% neq 0 (
    echo.
    echo Push failed. This could be due to:
    echo - The repository doesn't exist on GitHub yet
    echo - Authentication issues
    echo - Branch naming issues
    echo.
    echo Please create the repository on GitHub first at:
    echo https://github.com/new
    echo.
    echo Then try running this script again.
  ) else (
    echo.
    echo Successfully pushed to GitHub!
    echo Your repository is now available at: https://github.com/%username%/%repo_name%
  )
) else (
  echo Push cancelled.
)

echo.
pause 