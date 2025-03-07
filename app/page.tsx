"use client";

import { useState } from "react";
import { Button } from "../src/components/ui/button";
import { useMockSession } from "../src/providers/MockSessionProvider";

export default function Home() {
  const { session, status, signIn, signOut } = useMockSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn();
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Household Task Tracker</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A mobile-optimized application for tracking household tasks
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {status === "loading" || isLoading ? (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
          ) : status === "authenticated" ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">
                  Signed in as <strong>{session?.user?.name || "User"}</strong>
                </p>
              </div>
              <Button
                className="w-full"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
