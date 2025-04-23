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
import FocusStats from "@/components/landing/FocusStats";

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("features")} className="nav-link">Features</button>
              <button onClick={() => scrollToSection("how-it-works")} className="nav-link">How It Works</button>
              <button onClick={() => scrollToSection("pricing")} className="nav-link">Pricing</button>
              <button onClick={() => scrollToSection("usecase")} className="nav-link">Use Cases</button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="hidden md:inline-flex">Login</Button>
              </Link>
              <Link to="/">
                <Button>Dashboard</Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
  <section id="hero"><Hero /></section>
  <section id="features"><Features /></section>
  
  {/* Focus Stats Section */}
  <section id="focus-stats"><FocusStats /></section>
  
  <section id="how-it-works"><HowItWorks /></section>
  <section id="testimonials"><Testimonials /></section>
  <section id="pricing"><Cta /></section>
</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;