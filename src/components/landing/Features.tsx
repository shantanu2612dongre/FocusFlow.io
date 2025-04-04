import { FC } from "react";
import { motion } from "framer-motion";
import { BarChart3, Timer, Moon, Sun, ArrowDownUp } from "lucide-react";

// Define the Feature type
interface Feature {
  icon: FC<{ className?: string }>; // Ensure icons are React components
  title: string;
  description: string;
}

// Define features
const features: Feature[] = [
  {
    icon: BarChart3,
    title: "AI-Powered Analytics",
    description: "Get insights into your deep work sessions and track your progress over time."
  },
  {
    icon: Timer,
    title: "Zen Timer",
    description: "A distraction-free timer with smart session tracking and customizable settings."
  },
  {
    icon: () => (
      <div className="relative">
        <Moon className="absolute h-5 w-5 transition-opacity duration-300" />
        <Sun className="h-5 w-5 text-futuristic-purple transition-opacity duration-300" />
      </div>
    ),
    title: "Dark & Light Mode",
    description: "Seamless UI adaptation to match your preferred visual style and reduce eye strain."
  },
  {
    icon: ArrowDownUp,
    title: "Integration Ready",
    description: "Sync with calendars, task managers, and productivity tools for a complete workflow."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-futuristic-black/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supercharge Your <span className="bg-neon-gradient bg-clip-text text-transparent">Productivity</span>
          </h2>
          <p className="text-futuristic-text-secondary max-w-2xl mx-auto">
            Our features are designed to help you achieve deep work state and maximize your focus time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon; // Assign the component to a variable
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="feature-card flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-futuristic-purple/10 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="h-7 w-7 text-futuristic-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-futuristic-text-secondary">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}