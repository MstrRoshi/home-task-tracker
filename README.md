# Household Task Tracker

A mobile-optimized application for tracking tasks in a household. This application allows users to manage daily, weekly, and monthly tasks, assign them to household members, and track their completion status.

## Features

- **Mock Authentication**: Simple authentication system for development
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
- **Socket.IO**: For real-time communication between clients
- **date-fns**: For date formatting and manipulation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

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

## Authentication

The application uses a simple mock authentication system for development purposes:

1. Start the application
2. Navigate to [http://localhost:3000](http://localhost:3000)
3. Use the sign-in button to authenticate
4. You'll be logged in as a mock user with predefined credentials

## Usage

- **Sign In**: Use the mock authentication to sign in
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
   - Run `deploy.bat` and select option 1
   - Follow the prompts to deploy to Vercel
   - Set up the required environment variables:
     - NEXTAUTH_URL: Your Vercel deployment URL
     - NEXTAUTH_SECRET: A secure random string
     - GOOGLE_CLIENT_ID: Your Google OAuth client ID
     - GOOGLE_CLIENT_SECRET: Your Google OAuth client secret

2. **GitHub**
   - Run `deploy.bat` and select option 2
   - Follow the prompts to push your code to GitHub
   - Create a repository on GitHub before running the script

### Manual Deployment to Vercel

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
4. Set up environment variables
5. Deploy

## License

This project is licensed under the MIT License.
