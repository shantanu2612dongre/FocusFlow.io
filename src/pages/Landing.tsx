
import { motion } from "framer-motion";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowitWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-futuristic-purple/20">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between py-4">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" className="text-xl font-bold bg-neon-gradient bg-clip-text text-transparent">
                FocusFlow
              </Link>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-futuristic-text-primary hover:text-futuristic-purple transition-colors duration-200">Features</a>
              <a href="#how-it-works" className="text-futuristic-text-primary hover:text-futuristic-purple transition-colors duration-200">How It Works</a>
              <a href="#pricing" className="text-futuristic-text-primary hover:text-futuristic-purple transition-colors duration-200">Pricing</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="hidden md:inline-flex">
                  Login
                </Button>
              </Link>
              <Link to="/">
                <Button>Dashboard</Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Cta />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;