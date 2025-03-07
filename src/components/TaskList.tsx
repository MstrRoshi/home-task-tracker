import { useState } from "react";
import { Task, TaskFrequency, User } from "../types";
import { TaskCard } from "./TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TaskListProps {
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
  selectedUser?: string;
  users?: User[];
  currentUserId?: string;
}

export function TaskList({ tasks, onTaskComplete, selectedUser, users = [], currentUserId }: TaskListProps) {
  const filteredTasks = selectedUser 
    ? tasks.filter(task => task.assignedTo === selectedUser)
    : tasks;
  
  const dailyTasks = filteredTasks.filter(task => task.frequency === "daily");
  const weeklyTasks = filteredTasks.filter(task => task.frequency === "weekly");
  const monthlyTasks = filteredTasks.filter(task => task.frequency === "monthly");
  
  return (
    <Tabs defaultValue="daily" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
        <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
        <TabsTrigger value="monthly">Monthly Tasks</TabsTrigger>
      </TabsList>
      
      <TabsContent value="daily" className="mt-4 space-y-4">
        {dailyTasks.length === 0 ? (
          <p className="text-center text-muted-foreground">No daily tasks found</p>
        ) : (
          dailyTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onTaskComplete={onTaskComplete} 
              users={users}
              currentUserId={currentUserId}
            />
          ))
        )}
      </TabsContent>
      
      <TabsContent value="weekly" className="mt-4 space-y-4">
        {weeklyTasks.length === 0 ? (
          <p className="text-center text-muted-foreground">No weekly tasks found</p>
        ) : (
          weeklyTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onTaskComplete={onTaskComplete} 
              users={users}
              currentUserId={currentUserId}
            />
          ))
        )}
      </TabsContent>
      
      <TabsContent value="monthly" className="mt-4 space-y-4">
        {monthlyTasks.length === 0 ? (
          <p className="text-center text-muted-foreground">No monthly tasks found</p>
        ) : (
          monthlyTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onTaskComplete={onTaskComplete} 
              users={users}
              currentUserId={currentUserId}
            />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
} 