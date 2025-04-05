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
import DashboardPage from "./pages/DashboardPage";
import SignupPage from "./pages/Signup";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/components/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
               {/* Public Routes */}
            <Route path="/" element={<Index />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/pricing" element={<PricingPage />} />

                            {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/tasks" element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                  <ProtectedRoute>
                    <CalendarPage />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/sticky-notes" element={
                  <ProtectedRoute>
                    <StickyNotesPage />
                  </ProtectedRoute>
                } />

              {/* Catch-all 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;