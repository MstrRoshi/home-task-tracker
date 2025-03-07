"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../src/components/ui/button";

export default function IndexPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Household Task Tracker
        </h1>
        <p className="text-center text-gray-600">
          Choose which version of the application you want to use:
        </p>
        
        <div className="space-y-4 pt-4">
          <Button 
            className="w-full" 
            onClick={() => router.push("/home")}
          >
            Main Application (Google Auth)
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => router.push("/mock")}
          >
            Mock Authentication Version
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-center text-gray-500">
          The mock version allows you to test the application without setting up Google OAuth.
        </p>
      </div>
    </div>
  );
} 