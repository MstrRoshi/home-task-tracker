"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Task } from "../types";

// Define the socket context type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  emitTaskComplete: (taskId: string, completed: boolean) => void;
  emitTaskAdd: (task: Task) => void;
}

// Create the context with default values
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  emitTaskComplete: () => {},
  emitTaskAdd: () => {},
});

// Hook to use the socket context
export const useSocket = () => useContext(SocketContext);

// Socket provider component
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Get the base URL for the socket connection
    const baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : '');
    
    // Initialize socket connection
    const socketInstance = io(baseUrl, {
      path: "/api/socket",
      addTrailingSlash: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    // Set up event listeners
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setIsConnected(false);
    });

    // Save the socket instance
    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Function to emit task completion event
  const emitTaskComplete = (taskId: string, completed: boolean) => {
    if (socket && isConnected) {
      socket.emit("task:complete", { taskId, completed });
    }
  };

  // Function to emit new task event
  const emitTaskAdd = (task: Task) => {
    if (socket && isConnected) {
      socket.emit("task:add", { task });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        emitTaskComplete,
        emitTaskAdd,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
} 