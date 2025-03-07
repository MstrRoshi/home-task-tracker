# Household Task Tracker

A mobile-optimized application for tracking tasks in a household. This application allows users to manage daily, weekly, and monthly tasks, assign them to household members, and track their completion status.

## Features

- **User Authentication**: Sign in with Google account
- **Mock Authentication**: Alternative authentication system for development
- **Task Management**: Create, view, and complete household tasks
- **Task Categories**: Organize tasks by frequency (daily, weekly, monthly)
- **User Assignment**: Assign tasks to specific household members
- **User Filtering**: Filter tasks by assigned user
- **Real-time Updates**: See task changes across multiple devices in real-time
- **Mobile Optimized**: Responsive design that works well on mobile devices

## Technologies Used

- **Next.js**: React framework for building the application
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling the application
- **Shadcn UI**: Component library built on top of Tailwind CSS
- **Radix UI**: Accessible UI primitives
- **NextAuth.js**: For authentication with Google
- **Socket.IO**: For real-time communication between clients
- **date-fns**: For date formatting and manipulation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Google OAuth credentials (for authentication)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Authentication Options

### Option 1: Mock Authentication (No Setup Required)

For development and testing without setting up Google OAuth:

1. Start the application
2. Navigate to [http://localhost:3000](http://localhost:3000) and select "Mock Authentication Version"
3. Use the mock sign-in button to simulate authentication

For more details, see [MOCK_AUTH_GUIDE.md](./MOCK_AUTH_GUIDE.md).

### Option 2: Google OAuth Authentication

For full Google authentication functionality:

1. Follow the setup instructions in [GOOGLE_SSO_SETUP.md](./GOOGLE_SSO_SETUP.md)
2. Create a `.env.local` file with your Google OAuth credentials
3. Start the application and select "Main Application (Google Auth)"

### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add "http://localhost:3000" to the Authorized JavaScript origins
7. Add "http://localhost:3000/api/auth/callback/google" to the Authorized redirect URIs
8. Click "Create" and note your Client ID and Client Secret
9. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-random-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

## Usage

- **Sign In**: Use your Google account or the mock authentication to sign in
- **View Tasks**: Tasks are organized by frequency (daily, weekly, monthly) in separate tabs
- **Filter Tasks**: Use the user filter buttons at the top to view tasks assigned to specific users
- **Complete Tasks**: Check the checkbox on a task card to mark it as complete
- **Add New Tasks**: Click the plus button in the bottom right corner to add a new task
- **Real-time Updates**: Changes made by other users will be reflected in real-time across all connected devices

## Real-time Functionality

The application uses Socket.IO to provide real-time updates across multiple devices:

- When a user completes a task, all other connected users will see the task marked as complete in real-time
- When a user adds a new task, it will appear for all connected users immediately
- A green indicator at the bottom of the screen shows when real-time updates are active

This makes the application ideal for households where multiple people need to coordinate on tasks.

## Deployment

The application can be deployed to various platforms. For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Options

1. **Vercel (Recommended)**
   - Push your code to a Git repository
   - Import the repository in the Vercel dashboard
   - Configure environment variables
   - Deploy

2. **Railway**
   - Create a Railway account
   - Connect your repository
   - Set up environment variables
   - Deploy

3. **Heroku**
   - Create a Heroku app
   - Set up environment variables
   - Push your code to Heroku

## License

This project is licensed under the MIT License.
