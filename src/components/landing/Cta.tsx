
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="neon-border rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-futuristic-dark-gray to-futuristic-black p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-neon-gradient bg-clip-text text-transparent">
              Start Your Deep Work Journey Today
            </h2>
            <p className="text-lg text-futuristic-text-secondary max-w-2xl mx-auto mb-8">
              Join thousands of focused professionals who have transformed their productivity with DeepWork.io.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="neon-button px-8 py-6">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 border-futuristic-purple/40 hover:border-futuristic-purple hover:bg-futuristic-purple/5">
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}