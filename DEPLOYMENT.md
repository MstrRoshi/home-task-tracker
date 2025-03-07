# Deployment Guide for Household Task Tracker

This guide provides instructions for deploying the Household Task Tracker application to various platforms.

## Option 1: Deploy to Vercel (Recommended)

Vercel is the platform created by the team behind Next.js and offers the simplest deployment experience for Next.js applications like the Household Task Tracker.

### Prerequisites

1. Create a [Vercel account](https://vercel.com/signup) if you don't have one
2. Install the Vercel CLI (optional, our script will install it if needed):
   ```bash
   npm install -g vercel
   ```

### Deployment Steps

#### Method 1: Using the deploy.bat Script (Easiest)

1. Run the deployment script:
   ```bash
   deploy.bat
   ```
2. Select option 1 for Vercel deployment
3. Follow the prompts to:
   - Choose between local deployment or GitHub deployment
   - Set up environment variables (NEXTAUTH_URL, NEXTAUTH_SECRET, etc.)
   - Complete the deployment process

#### Method 2: Using the Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - Set the Framework Preset to "Next.js"
   - Add the following environment variables:
     - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
     - `NEXTAUTH_SECRET`: Your NextAuth secret key
     - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
     - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
6. Click "Deploy"

### Post-Deployment Configuration

1. Update your Google OAuth credentials:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Add your production URL to the Authorized JavaScript origins
   - Add `https://your-app.vercel.app/api/auth/callback/google` to the Authorized redirect URIs

2. Test the application:
   - Visit your deployed URL
   - Verify that authentication works
   - Test real-time functionality by opening the app in multiple browsers

## Option 2: Deploy to GitHub

GitHub is a platform for hosting and sharing code. Deploying to GitHub is typically the first step before deploying to platforms like Vercel, Railway, or Heroku.

### Prerequisites

1. Create a [GitHub account](https://github.com/join) if you don't have one
2. Install [Git](https://git-scm.com/downloads) on your computer

### Deployment Steps

#### Method 1: Using the deploy.bat Script

1. Run the deployment script:
   ```bash
   deploy.bat
   ```
2. Select option 2 for GitHub deployment
3. Follow the prompts to:
   - Enter your GitHub repository name
   - Enter your GitHub username
   - Provide a commit message
   - Confirm pushing to GitHub

#### Method 2: Manual GitHub Deployment

1. Create a new repository on GitHub:
   - Go to [https://github.com/new](https://github.com/new)
   - Enter a repository name (e.g., household-task-tracker)
   - Choose public or private visibility
   - Click "Create repository"

2. Initialize Git in your project (if not already done):
   ```bash
   git init
   ```

3. Add your files to Git:
   ```bash
   git add .
   ```

4. Commit your changes:
   ```bash
   git commit -m "Initial commit of Household Task Tracker"
   ```

5. Add the remote repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

6. Push to GitHub:
   ```bash
   git push -u origin main
   ```

### Post-Deployment Steps

After pushing to GitHub, you can:
- Share your repository with others
- Enable GitHub Pages for static content
- Connect your repository to deployment platforms like Vercel, Railway, or Heroku

## Option 3: Deploy to Railway

Railway is a platform that makes it easy to deploy full-stack applications.

### Deployment Steps

1. Create a [Railway account](https://railway.app/)
2. Install the Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```
3. Log in to Railway:
   ```bash
   railway login
   ```
4. Initialize a new project:
   ```bash
   railway init
   ```
5. Deploy your application:
   ```bash
   railway up
   ```
6. Set up environment variables in the Railway dashboard:
   - `NEXTAUTH_URL`: Your production URL
   - `NEXTAUTH_SECRET`: Your NextAuth secret key
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

## Option 4: Deploy to Heroku

### Deployment Steps

1. Create a [Heroku account](https://signup.heroku.com/)
2. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
3. Log in to Heroku:
   ```bash
   heroku login
   ```
4. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
5. Add a Procfile to your project root:
   ```
   web: npm start
   ```
6. Set up environment variables:
   ```bash
   heroku config:set NEXTAUTH_URL=https://your-app.herokuapp.com
   heroku config:set NEXTAUTH_SECRET=your-nextauth-secret
   heroku config:set GOOGLE_CLIENT_ID=your-google-client-id
   heroku config:set GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```
7. Deploy your application:
   ```bash
   git push heroku main
   ```

## Troubleshooting

### Socket.IO Connection Issues

If you're experiencing issues with Socket.IO connections:

1. Check browser console for connection errors
2. Verify that your environment variables are set correctly
3. Ensure your server is properly configured to handle WebSocket connections
4. Check if your hosting provider supports WebSockets (most modern providers do)

### Authentication Issues

If authentication is not working:

1. Verify that your Google OAuth credentials are correctly set up for your production URL
2. Check that all required environment variables are set
3. Ensure your callback URLs are correctly configured

### General Deployment Issues

1. Check the deployment logs for any errors
2. Verify that your build is completing successfully 