"use client";

import { useState } from "react";
import { Button } from "../../../src/components/ui/button";
import { useMockSession } from "../../../src/providers/MockSessionProvider";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useMockSession();

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to Household Task Tracker</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your household tasks
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
              </svg>
            )}
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
} 