import { Task, User } from "../types";
import { Session } from "next-auth";

export const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    avatar: "https://ui.shadcn.com/avatars/01.png",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    avatar: "https://ui.shadcn.com/avatars/02.png",
  },
  {
    id: "user-3",
    name: "Mike Johnson",
    avatar: "https://ui.shadcn.com/avatars/03.png",
  },
];

// Convert a session user to our User type
export function sessionUserToAppUser(session: Session | null): User | null {
  if (!session?.user) return null;
  
  return {
    id: session.user.id,
    name: session.user.name || "Anonymous User",
    avatar: session.user.image || undefined,
  };
}

// Check if a user is already in the users array
export function isUserInList(userId: string, userList: User[]): boolean {
  return userList.some(user => user.id === userId);
}

export const tasks: Task[] = [
  // Daily Tasks
  {
    id: "task-1",
    title: "Wash dishes",
    description: "Clean all dishes after dinner",
    completed: false,
    frequency: "daily",
    assignedTo: "user-1",
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "task-2",
    title: "Take out trash",
    description: "Empty all trash bins and take to curb",
    completed: true,
    frequency: "daily",
    assignedTo: "user-2",
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "task-3",
    title: "Feed pets",
    description: "Feed the dog and cat",
    completed: false,
    frequency: "daily",
    assignedTo: "user-3",
    createdAt: new Date("2023-05-01"),
  },
  
  // Weekly Tasks
  {
    id: "task-4",
    title: "Vacuum living room",
    description: "Vacuum the carpet and furniture",
    completed: false,
    frequency: "weekly",
    assignedTo: "user-1",
    dueDate: new Date("2023-05-07"),
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "task-5",
    title: "Clean bathroom",
    description: "Clean toilet, shower, and sink",
    completed: false,
    frequency: "weekly",
    assignedTo: "user-2",
    dueDate: new Date("2023-05-07"),
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "task-6",
    title: "Mow lawn",
    description: "Cut the grass and trim edges",
    completed: true,
    frequency: "weekly",
    assignedTo: "user-3",
    dueDate: new Date("2023-05-07"),
    createdAt: new Date("2023-05-01"),
  },
  
  // Monthly Tasks
  {
    id: "task-7",
    title: "Deep clean kitchen",
    description: "Clean oven, refrigerator, and cabinets",
    completed: false,
    frequency: "monthly",
    assignedTo: "user-1",
    dueDate: new Date("2023-05-30"),
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "task-8",
    title: "Change air filters",
    description: "Replace HVAC air filters",
    completed: false,
    frequency: "monthly",
    assignedTo: "user-2",
    dueDate: new Date("2023-05-30"),
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "task-9",
    title: "Clean gutters",
    description: "Remove debris from gutters",
    completed: true,
    frequency: "monthly",
    assignedTo: "user-3",
    dueDate: new Date("2023-05-30"),
    createdAt: new Date("2023-05-01"),
  },
]; 