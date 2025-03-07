"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "../../../src/components/ui/button";
import { GoogleIcon } from "../../../src/components/icons/GoogleIcon";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign in to Household Task Tracker</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with your Google account to manage your household tasks
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <GoogleIcon className="h-4 w-4" />
            )}
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
} 