@echo off
echo Deploying to Heroku...

REM Check if Heroku CLI is installed
where heroku >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Heroku CLI not found. Installing...
  npm install -g heroku
)

REM Login to Heroku if needed
heroku login

REM Check if app name is provided
set /p app_name=Enter your Heroku app name (or press Enter to create a new one): 

if "%app_name%"=="" (
  echo Creating a new Heroku app...
  heroku create
) else (
  echo Using existing app: %app_name%
  heroku git:remote -a %app_name%
)

REM Set environment variables
echo Setting up environment variables...
echo You'll need to set these manually or through the script.
echo.
set /p setup_env=Do you want to set up environment variables now? (y/n): 

if /i "%setup_env%"=="y" (
  set /p nextauth_url=Enter NEXTAUTH_URL (e.g., https://your-app.herokuapp.com): 
  set /p nextauth_secret=Enter NEXTAUTH_SECRET: 
  set /p google_client_id=Enter GOOGLE_CLIENT_ID: 
  set /p google_client_secret=Enter GOOGLE_CLIENT_SECRET: 
  
  heroku config:set NEXTAUTH_URL=%nextauth_url%
  heroku config:set NEXTAUTH_SECRET=%nextauth_secret%
  heroku config:set GOOGLE_CLIENT_ID=%google_client_id%
  heroku config:set GOOGLE_CLIENT_SECRET=%google_client_secret%
)

REM Deploy to Heroku
echo Deploying to Heroku...
git push heroku main

echo.
echo Deployment complete! If successful, your app is now live.
echo You can open your app with: heroku open
echo.
pause 