
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import TasksPage from "./pages/tasks";
import CalendarPage from "./pages/calendar";
import SettingsPage from "./pages/settings";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/Landing";
import PricingPage from "./pages/PricingPage";
import StickyNotesPage from "@/pages/StickyNotes";
import LoginPage from "./pages/Login";
import DashboardPage from './pages/DashboardPage';
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/sticky-notes" element={<StickyNotesPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
