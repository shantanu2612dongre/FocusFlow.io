
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TaskList } from "@/components/TaskList";
import { motion } from "framer-motion";
import { Timer } from "@/components/Timer";
import { Heatmap } from "@/components/Heatmap";
import Footer from "@/components/Footer";

const TasksPage = () => {
  const handleSessionComplete = (sessionType: string, duration: number) => {
    console.log(`Completed ${sessionType} session of ${duration} seconds`);
    // In a real app, we would save this to the database
  };
  

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-futuristic-black">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <h1 className="text-3xl font-bold mb-2 bg-neon-gradient bg-clip-text text-transparent">
                Task Manager
              </h1> */}
              <h1 className="text-3xl font-bold mb-2">Task Manager</h1>
              <p className="text-futuristic-text-secondary">
                Manage your tasks and boost productivity through focused deep work sessions.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
              
              {/* Tasks Component */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-futuristic-dark-gray rounded-lg border border-futuristic-purple/20 shadow-lg overflow-hidden">
                  <TaskList onTaskComplete={function (change: number): void {
                    throw new Error("Function not implemented.");
                  } }/>
                </div>
              </motion.div>
            </div>
            
            {/* Heatmap Section */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Heatmap />
            </motion.div>
            
            {/* Feature Cards */}
            {/* <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-futuristic-text-primary">
                Deep Work Strategies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Pomodoro Technique",
                    description: "Work in focused 25-minute intervals with 5-minute breaks to maintain peak productivity."
                  },
                  {
                    title: "Time Blocking",
                    description: "Assign specific time blocks for deep work tasks to eliminate context switching."
                  },
                  {
                    title: "Digital Minimalism",
                    description: "Reduce digital distractions to create an environment conducive to focus."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="feature-card"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-futuristic-text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-futuristic-text-secondary">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}
          </main>
          
         <Footer/>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TasksPage;
