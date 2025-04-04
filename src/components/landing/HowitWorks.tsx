
import { motion } from "framer-motion";
import { TimerIcon, Brain, LineChart, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: TimerIcon,
    title: "Set Timer",
    description: "Choose your work duration and break intervals to match your ideal focus pattern."
  },
  {
    icon: Brain,
    title: "Work",
    description: "Dive deep into focused work without distractions or interruptions."
  },
  {
    icon: LineChart,
    title: "Track",
    description: "Automatically log your focus sessions and build a visual history of your work."
  },
  {
    icon: TrendingUp,
    title: "Improve",
    description: "Review insights and adjust your approach to optimize your productivity."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="bg-neon-gradient bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-futuristic-text-secondary max-w-2xl mx-auto">
            A simple yet powerful approach to mastering the art of deep work
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute hidden md:block left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-futuristic-purple/60 to-futuristic-cyan/40 -z-10"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center md:gap-x-12 mb-12`}
              >
                <div className={`w-full md:w-1/2 flex ${
                  index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                } mb-6 md:mb-0`}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-futuristic-purple/10 neon-border">
                    <step.icon className="h-8 w-8 text-futuristic-purple" />
                  </div>
                </div>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'text-left' : 'md:text-right'} text-center md:text-left`}>
                  <div className="bg-futuristic-dark-gray/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-futuristic-text-secondary">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}