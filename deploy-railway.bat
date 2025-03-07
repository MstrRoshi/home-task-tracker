@echo off
echo Deploying to Railway...

REM Check if Railway CLI is installed
where railway >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Railway CLI not found. Installing...
  npm install -g @railway/cli
)

REM Login to Railway if needed
railway login

REM Deploy to Railway
echo Running Railway deployment...
railway up

echo.
echo Deployment complete! If successful, your app is now live.
echo Don't forget to set up your environment variables in the Railway dashboard.
echo.
pause 