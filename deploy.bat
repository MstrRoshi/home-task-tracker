@echo off
echo Household Task Tracker Deployment Tool
echo =====================================
echo.
echo Choose a deployment platform:
echo 1. Vercel (Recommended for Next.js)
echo 2. GitHub (Push to repository)
echo.
set /p platform=Enter your choice (1-4) [1]: 

if "%platform%"=="" (
  set platform=1
)

if "%platform%"=="1" (
  call deploy-vercel.bat
) else if "%platform%"=="2" (
  echo.
  echo GitHub Deployment Options:
  echo 1. Use standard batch script (may require terminal restart if Git was just installed)
  echo 2. Use PowerShell script (recommended, can install Git automatically)
  echo.
  set /p github_option=Enter your choice (1-2) [2]: 
  
  if "%github_option%"=="" (
    set github_option=2
  )
  
  if "%github_option%"=="1" (
    call deploy-github.bat
  ) else if "%github_option%"=="2" (
    powershell -ExecutionPolicy Bypass -File deploy-github-ps.ps1
  ) else (
    echo Invalid choice. Using PowerShell script by default.
    powershell -ExecutionPolicy Bypass -File deploy-github-ps.ps1
  )
) else if "%platform%"=="3" (
  call deploy-railway.bat
) else if "%platform%"=="4" (
  call deploy-heroku.bat
) else (
  echo Invalid choice. Please run the script again and select a valid option.
  pause
  exit /b 1
)

exit /b 0 