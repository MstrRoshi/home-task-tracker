"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User } from "../../src/types";
import { users as initialUsers, sessionUserToAppUser, isUserInList } from "../../src/lib/data";
import { Navbar } from "../../src/components/Navbar";
import { BottomNav } from "../../src/components/BottomNav";
import { Button } from "../../src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../src/components/ui/avatar";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../../src/components/ui/dialog";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { PlusCircle, Mail, Check } from "lucide-react";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  
  // Add authenticated user to users list if not already present
  useEffect(() => {
    if (session?.user) {
      const authUser = sessionUserToAppUser(session);
      if (authUser && !isUserInList(authUser.id, users)) {
        setUsers(prevUsers => [...prevUsers, authUser]);
      }
    }
  }, [session, users]);
  
  const handleSendInvite = () => {
    // In a real app, this would send an API request to send an email invitation
    console.log(`Sending invite to: ${inviteEmail}`);
    setInviteSent(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setInviteSent(false);
      setInviteEmail("");
      setIsInviteDialogOpen(false);
    }, 3000);
  };
  
  // Show loading state
  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 p-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
            <p className="text-muted-foreground mb-6">
              You need to sign in to view household users.
            </p>
            <Button onClick={() => window.location.href = "/auth/signin"}>
              Sign In
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Household Users</h1>
            
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Invite User</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite a New User</DialogTitle>
                  <DialogDescription>
                    Send an invitation email to add someone to your household.
                  </DialogDescription>
                </DialogHeader>
                
                {inviteSent ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium">Invitation Sent!</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      We've sent an invitation to {inviteEmail}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleSendInvite} 
                        disabled={!inviteEmail || !inviteEmail.includes('@')}
                        className="w-full sm:w-auto"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Invitation
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {users.map(user => {
              const isCurrentUser = user.id === session.user.id;
              return (
                <div 
                  key={user.id} 
                  className={`p-4 rounded-lg border ${isCurrentUser ? 'border-green-500' : 'border-border'} bg-card`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className={`h-12 w-12 ${isCurrentUser ? 'ring-2 ring-green-500' : ''}`}>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{user.name}</h3>
                        {isCurrentUser && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {isCurrentUser ? 'Current user' : 'Household member'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 