import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Task, User } from "../types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TaskCardProps {
  task: Task;
  onTaskComplete: (taskId: string, completed: boolean) => void;
  users: User[];
  currentUserId?: string;
}

export function TaskCard({ task, onTaskComplete, users, currentUserId }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  
  // Update local state when task prop changes (for real-time updates)
  useEffect(() => {
    setIsCompleted(task.completed);
  }, [task.completed]);
  
  const assignedUser = users.find(user => user.id === task.assignedTo);
  const isAssignedToCurrentUser = task.assignedTo === currentUserId;
  
  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked);
    onTaskComplete(task.id, checked);
  };
  
  return (
    <Card className={`w-full transition-opacity duration-300 ${isCompleted ? 'opacity-60' : ''} ${isAssignedToCurrentUser ? 'border-green-500' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
          {assignedUser && (
            <Avatar className={`h-6 w-6 ${isAssignedToCurrentUser ? 'ring-2 ring-green-500' : ''}`}>
              <AvatarImage src={assignedUser.avatar} alt={assignedUser.name} />
              <AvatarFallback>{assignedUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
        {task.dueDate && (
          <p className="text-xs text-muted-foreground mt-2">
            Due: {format(task.dueDate, "PPP")}
          </p>
        )}
        {assignedUser && (
          <p className="text-xs text-muted-foreground mt-2">
            Assigned to: {assignedUser.name} {isAssignedToCurrentUser ? "(You)" : ""}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`task-${task.id}`} 
            checked={isCompleted}
            onCheckedChange={handleCheckboxChange}
          />
          <label 
            htmlFor={`task-${task.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {isCompleted ? "Completed" : "Mark as complete"}
          </label>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
          {task.frequency}
        </span>
      </CardFooter>
    </Card>
  );
} 