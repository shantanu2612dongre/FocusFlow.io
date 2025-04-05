import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabaseClient";

export function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <motion.header 
      className="border-b border-futuristic-purple/20 sticky top-0 z-10 bg-futuristic-black/80 backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <SidebarTrigger className="mr-2 text-futuristic-text-primary hover:text-futuristic-purple transition-colors duration-300" />
          <span className="text-xl font-bold bg-neon-gradient bg-clip-text text-transparent">
            FocusFlow
          </span>
        </motion.div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-futuristic-purple/10 transition-colors duration-200 text-futuristic-text-primary"
          >
            <Bell className="h-5 w-5 transition-transform hover:scale-110 duration-200" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-futuristic-purple/10 transition-colors duration-200 text-futuristic-text-primary"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 transition-transform hover:scale-110 duration-200" />
          </Button>
          

          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}