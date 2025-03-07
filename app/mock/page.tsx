"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task, User } from "../../src/types";
import { tasks as initialTasks, users as initialUsers, isUserInList } from "../../src/lib/data";
import { TaskList } from "../../src/components/TaskList";
import { UserFilter } from "../../src/components/UserFilter";
import { AddTaskDialog } from "../../src/components/AddTaskDialog";
import { Navbar } from "../../src/components/Navbar";
import { BottomNav } from "../../src/components/BottomNav";
import { Button } from "../../src/components/ui/button";
import { Plus } from "lucide-react";
import { useMockSession } from "../../src/providers/MockSessionProvider";
import { useSocket } from "../../src/providers/SocketProvider";

export default function MockHome() {
  const { session, status } = useMockSession();
  const [taskList, setTaskList] = useState(initialTasks);
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const { socket, isConnected, emitTaskComplete, emitTaskAdd } = useSocket();
  
  // Add authenticated user to users list if not already present
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (!isUserInList(session.user.id, users)) {
        const mockUser: User = {
          id: session.user.id,
          name: session.user.name || "Mock User",
          avatar: session.user.image || undefined,
        };
        setUsers(prevUsers => [...prevUsers, mockUser]);
      }
    }
  }, [session, status, users]);

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for task completion events from other clients
    const handleTaskComplete = (data: { taskId: string; completed: boolean }) => {
      setTaskList(prevTasks =>
        prevTasks.map(task =>
          task.id === data.taskId ? { ...task, completed: data.completed } : task
        )
      );
    };

    // Listen for new task events from other clients
    const handleTaskAdd = (data: { task: Task }) => {
      setTaskList(prevTasks => [...prevTasks, data.task]);
    };

    // Register event listeners
    socket.on("task:complete", handleTaskComplete);
    socket.on("task:add", handleTaskAdd);

    // Clean up event listeners on unmount
    return () => {
      socket.off("task:complete", handleTaskComplete);
      socket.off("task:add", handleTaskAdd);
    };
  }, [socket]);

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    // Update local state
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
    
    // Emit event to other clients
    emitTaskComplete(taskId, completed);
  };

  const handleSelectUser = (userId: string | undefined) => {
    setSelectedUser(userId);
  };

  const handleAddTask = (newTaskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      id: uuidv4(),
      ...newTaskData,
      createdAt: new Date(),
    };
    
    // Update local state
    setTaskList(prevTasks => [...prevTasks, newTask]);
    setIsAddTaskOpen(false);
    
    // Emit event to other clients
    emitTaskAdd(newTask);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container max-w-md mx-auto p-4 pb-20">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <h2 className="text-yellow-800 font-medium">Mock Authentication Mode</h2>
          <p className="text-yellow-700 text-sm mt-1">
            You're using the mock authentication system.
          </p>
        </div>
        
        <UserFilter
          users={users}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
          currentUserId={session?.user?.id}
        />
        
        <TaskList
          tasks={taskList}
          onTaskComplete={handleTaskComplete}
          selectedUser={selectedUser}
          users={users}
          currentUserId={session?.user?.id}
        />
        
        <div className="fixed bottom-20 right-4">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={() => setIsAddTaskOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        
        <AddTaskDialog
          onAddTask={handleAddTask}
          users={users}
          currentUserId={session?.user?.id}
        />
      </main>
      
      <BottomNav />
      
      {isConnected && (
        <div className="fixed bottom-16 left-0 right-0 bg-green-100 text-green-800 text-xs text-center py-1">
          Real-time updates active
        </div>
      )}
    </div>
  );
} 