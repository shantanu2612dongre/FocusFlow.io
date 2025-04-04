
import { useState } from "react";
import { Header } from "@/components/Header";
import { Timer } from "@/components/Timer";
import { TaskList } from "@/components/TaskList";
import { Dashboard } from "@/components/Dashboard";
import { Heatmap } from "@/components/Heatmap";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Footer from "@/components/Footer";

const Index = () => {
  const [stats, setStats] = useState({
    totalHours: 0,
    sessionsCompleted: 0,
    dailyStreak: 1,
    tasksCompleted: 0,
  });

  const handleSessionComplete = (sessionType: string, duration: number) => {
    if (sessionType === "work") {
      const hoursWorked = duration / 3600; // Convert seconds to hours
      setStats(prev => ({
        ...prev,
        totalHours: prev.totalHours + hoursWorked,
        sessionsCompleted: prev.sessionsCompleted + 1
      }));
      const handleTaskCompletion = (isCompleted: boolean) => {
        setStats(prev => ({
          ...prev,
          tasksCompleted: isCompleted ? prev.tasksCompleted + 1 : prev.tasksCompleted - 1, 
        }));
      };
      // Show toast notification
      toast({
        title: "Deep Work Session Completed!",
        description: `You've completed a ${hoursWorked.toFixed(2)} hour deep work session.`,
      });
    }
  };
  const handleTaskCompletion = (change: number) => {
    setStats(prev => ({
      ...prev,
      tasksCompleted: prev.tasksCompleted + change,
    }));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to FocusFlow</h1>
              <p className="text-muted-foreground">Your productivity assistant for deep work.</p>
            </div>
            
            <div className="mb-8">
              <Dashboard stats={stats} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Timer onSessionComplete={handleSessionComplete} />
                <Heatmap />
              </div>
              
              <div>
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tasks" className="mt-0">
                  <TaskList onTaskComplete={handleTaskCompletion} />
                  </TabsContent>
                  <TabsContent value="history" className="mt-0">
                    <div className="bg-card rounded-lg border shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
                      <h3 className="text-xl font-semibold mb-4">Session History</h3>
                      <p className="text-muted-foreground text-center mb-6">
                        Track your deep work sessions and see your progress over time.
                      </p>
                      <Button variant="outline">
                        View Detailed Analytics
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
          
          <Footer/>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
