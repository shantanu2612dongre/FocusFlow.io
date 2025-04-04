import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    name: "Free Plan",
    price: "$0",
    description: "Perfect for personal use and beginners.",
    features: [
      "Basic task tracking",
      "Daily deep work sessions",
      "Basic productivity analytics",
      "Limited storage for notes",
      "Community support",
    ],
    bgColor: "bg-gray-900",
  },
  {
    name: "Pro Plan",
    price: "$9.99/month",
    description: "Great for professionals and productivity enthusiasts.",
    features: [
      "Unlimited task tracking",
      "Custom deep work timers",
      "Advanced analytics and insights",
      "Priority email support",
      "Sync across multiple devices",
    ],
    bgColor: "bg-futuristic-purple",
  },
  {
    name: "Enterprise Plan",
    price: "$29.99/month",
    description: "For teams and businesses to maximize efficiency.",
    features: [
      "Team collaboration & shared workspaces",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 priority support",
      "Enterprise-grade security & compliance",
    ],
    bgColor: "bg-gray-900",
  },
];

export function Cta() {
  const navigate = useNavigate(); // Hook for navigation

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
           

            {/* Pricing Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`p-6 rounded-xl border-2 border-futuristic-purple neon-glow ${plan.bgColor}`}>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xl text-futuristic-purple mt-2">{plan.price}</p>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-futuristic-purple mr-2" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 w-full neon-button">Choose Plan</Button>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}