
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarIcon } from "lucide-react";
import Footer from "@/components/Footer";

const CalendarPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Calendar</h1>
              <p className="text-muted-foreground">Schedule your deep work sessions and view upcoming tasks.</p>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
              <CalendarIcon className="h-16 w-16 mb-4 text-primary/50" />
              <h3 className="text-xl font-semibold mb-2">Calendar Coming Soon</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Your deep work sessions and tasks will be displayed here in a calendar view.
                Sync with Google Calendar and never miss a scheduled deep work session.
              </p>
            </div>
          </main>
          
          <Footer/>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CalendarPage;
