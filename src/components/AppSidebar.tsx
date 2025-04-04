
import { 
  LayoutDashboard, 
  CheckSquare, 
  CalendarDays, 
  Settings,
  DollarSign 
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Task Manager",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    title: "Calendar",
    icon: CalendarDays,
    path: "/calendar",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Pricing",
    icon: DollarSign,
    path: "/pricing",
  },
];

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r border-futuristic-purple/20">
      <SidebarHeader>
        <motion.div 
          className="flex items-center justify-center gap-2 px-4 py-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-xl font-bold bg-neon-gradient bg-clip-text text-transparent">
            FocusFlow
          </span>
        </motion.div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-futuristic-text-secondary">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    isActive={location.pathname === item.path}
                    className="transition-all duration-300 hover:bg-futuristic-purple/10"
                  >
                    <Link to={item.path} className="flex items-center gap-2 text-futuristic-text-primary">
                      <item.icon className={location.pathname === item.path ? "text-futuristic-purple" : ""} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 text-center text-xs text-futuristic-text-secondary">
          <p>FocusFlow - Deep Work</p>
          <p>Version 1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
