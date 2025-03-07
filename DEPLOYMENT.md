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

1. Push your code to a GitHub repository (use option 2 in the deploy.bat script)
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

1. Test the application:
   - Visit your deployed URL
   - Verify that authentication works
   - Test real-time functionality by opening the app in multiple browsers

## Option 2: Deploy to GitHub

GitHub is a platform for hosting and sharing code. Deploying to GitHub is typically the first step before deploying to platforms like Vercel.

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
- Connect your repository to deployment platforms like Vercel

## Troubleshooting

### Socket.IO Connection Issues

If you're experiencing issues with Socket.IO connections:

1. Check browser console for connection errors
2. Verify that your environment variables are set correctly
3. Ensure your server is properly configured to handle WebSocket connections
4. Check if your hosting provider supports WebSockets (most modern providers do)

### Authentication Issues

If authentication is not working:

1. Check that the mock authentication system is properly initialized
2. Verify that the SessionProvider is correctly set up in your layout
3. Check browser console for any errors

### General Deployment Issues

1. Check the deployment logs for any errors
2. Verify that your build is completing successfully
3. Make sure your environment variables are correctly set
4. If using Vercel, check the Vercel dashboard for detailed error logs 