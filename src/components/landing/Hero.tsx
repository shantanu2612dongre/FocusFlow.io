
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-futuristic-black to-futuristic-purple/20 dark:from-black dark:to-futuristic-purple/30 -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-futuristic-purple/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-futuristic-magenta/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-neon-gradient bg-clip-text text-transparent mb-6">
              Maximize Your Focus.<br />Master Deep Work.
            </h1>
            <p className="text-lg md:text-xl text-futuristic-text-secondary mb-8 max-w-2xl mx-auto">
              A powerful deep work timer designed to enhance productivity and track your focused sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="neon-button px-8 py-6">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 border-futuristic-purple/40 hover:border-futuristic-purple hover:bg-futuristic-purple/5">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="relative neon-border p-1 rounded-lg overflow-hidden">
              <div className="bg-futuristic-black rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="DeepWork.io Application Screenshot" 
                  className="w-full max-w-3xl h-auto rounded-lg" 
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}