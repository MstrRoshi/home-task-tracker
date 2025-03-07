"use client";

import React, { createContext, useContext, useState } from "react";

// Define the session type
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  user: User;
}

interface MockSessionContextType {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create a mock user
const mockUser: User = {
  id: "mock-user-1",
  name: "Mock User",
  email: "mockuser@example.com",
  image: "https://ui.shadcn.com/avatars/01.png",
};

// Create the context
const MockSessionContext = createContext<MockSessionContextType>({
  session: null,
  status: "unauthenticated",
  signIn: async () => {},
  signOut: async () => {},
});

// Hook to use the mock session
export const useMockSession = () => useContext(MockSessionContext);

// Mock session provider component
export function MockSessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("unauthenticated");

  // Mock sign in function
  const signIn = async (provider?: string) => {
    console.log(`Mock sign in with provider: ${provider}`);
    setStatus("loading");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSession({ user: mockUser });
    setStatus("authenticated");
  };

  // Mock sign out function
  const signOut = async () => {
    console.log("Mock sign out");
    setStatus("loading");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSession(null);
    setStatus("unauthenticated");
  };

  return (
    <MockSessionContext.Provider value={{ session, status, signIn, signOut }}>
      {children}
    </MockSessionContext.Provider>
  );
} 