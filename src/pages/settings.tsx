"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SettingsPage = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  // 🔹 Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();

      if (error) {
        toast.error("Error fetching user data");
        return;
      }

      setUserData({
        name: data.full_name || "",
        email: data.email || "",
      });
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: userData.name,
        email: userData.email,
      })
      .eq("id", userId);

    setLoading(false);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Customize your FocusFlow experience.</p>
            </div>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="timer">Timer</TabsTrigger>
              </TabsList>

              {/* 🔹 Account Tab */}
              <TabsContent value="account" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={userData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* 🔹 Appearance Tab */}
              <TabsContent value="appearance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize the look and feel of FocusFlow.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Label>Theme</Label>
                    <div className="flex items-center gap-2">
                      <span>Toggle between light and dark mode:</span>
                      <ThemeToggle />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 🔹 Timer Tab */}
              <TabsContent value="timer" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Timer Settings</CardTitle>
                    <CardDescription>
                      Customize your deep work and break durations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="workDuration">Work Duration (minutes)</Label>
                      <Input id="workDuration" type="number" placeholder="60" min="1" max="120" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                      <Input id="breakDuration" type="number" placeholder="5" min="1" max="30" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>

          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SettingsPage;