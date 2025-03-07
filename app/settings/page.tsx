"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "../../src/components/Navbar";
import { BottomNav } from "../../src/components/BottomNav";
import { Button } from "../../src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../src/components/ui/avatar";
import { Switch } from "../../src/components/ui/switch";
import { Label } from "../../src/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/ui/tabs";
import { Bell, User, LogOut } from "lucide-react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [newUserAlerts, setNewUserAlerts] = useState(true);
  
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
              You need to sign in to view settings.
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
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                      <AvatarFallback>
                        {session.user.name
                          ? session.user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="text-lg font-medium">{session.user.name}</h3>
                      <p className="text-sm text-muted-foreground">{session.user.email}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Display Name</h4>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={session.user.name || ""}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled
                        />
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Email Address</h4>
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={session.user.email || ""}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled
                        />
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="w-full sm:w-auto flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications about tasks and household activities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications on your device
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-3">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="task-reminders">Task Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get reminded about upcoming and overdue tasks
                          </p>
                        </div>
                        <Switch
                          id="task-reminders"
                          checked={taskReminders}
                          onCheckedChange={setTaskReminders}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="new-user-alerts">New User Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone joins your household
                          </p>
                        </div>
                        <Switch
                          id="new-user-alerts"
                          checked={newUserAlerts}
                          onCheckedChange={setNewUserAlerts}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full sm:w-auto">
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 