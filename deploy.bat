@echo off
echo Household Task Tracker Deployment Tool
echo =====================================
echo.
echo Choose a deployment platform:
echo 1. Vercel (Recommended for Next.js)
echo 2. GitHub (Push to repository)
echo.
set /p platform=Enter your choice (1-2) [1]: 

if "%platform%"=="" (
  set platform=1
)

if "%platform%"=="1" (
  powershell -ExecutionPolicy Bypass -File deploy-vercel-simple.ps1
) else if "%platform%"=="2" (
  powershell -ExecutionPolicy Bypass -File deploy-github-ps.ps1
) else (
  echo Invalid choice. Please run the script again and select a valid option.
  pause
  exit /b 1
)

exit /b 0 