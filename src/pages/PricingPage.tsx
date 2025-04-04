import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";

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
            "Community support"
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
            "Sync across multiple devices"
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
            "Enterprise-grade security & compliance"
        ],
        bgColor: "bg-gray-900",
    }
];

export default function PricingPage() {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
                        <h1 className="text-3xl font-bold text-futuristic-purple">Pricing Plans</h1>
                        <p className="text-lg text-gray-500">Choose a plan that fits your needs.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className={`p-6 ${plan.bgColor} text-white rounded-lg shadow-md`}>
                                    <h2 className="text-2xl font-semibold">{plan.name}</h2>
                                    <p className="text-gray-300">{plan.description}</p>
                                    <p className="text-3xl font-bold mt-2">{plan.price}</p>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle size={16} className="text-green-400" /> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="mt-4 w-full py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition">
                                        {index === 0 ? "Get Started" : "Upgrade Now"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </main>
                    <Footer/>
                </div>
            </div>
        </SidebarProvider>
    );
}