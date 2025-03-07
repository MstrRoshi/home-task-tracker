export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type TaskFrequency = 'daily' | 'weekly' | 'monthly';

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  frequency: TaskFrequency;
  assignedTo?: string; // User ID
  dueDate?: Date;
  createdAt: Date;
}; 