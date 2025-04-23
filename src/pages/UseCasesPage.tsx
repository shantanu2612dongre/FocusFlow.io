import Footer from "@/components/Footer";
import {
  LucideBookOpen,
  LucideBriefcase,
  LucideHeart,
  LucideHome,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const focusData = [
  {
    icon: <LucideBriefcase className="w-5 h-5" />,
    title: "For Work",
    description: "Boost productivity, maintain energy, balance family time",
    img: "/founder.png",
    gradient: "from-purple-700/60 via-purple-500/30 to-transparent",
  },
  {
    icon: <LucideBookOpen className="w-5 h-5" />,
    title: "For Students",
    description: "Ace exams, improve sleep, better manage ADHD",
    img: "/student.png",
    gradient: "from-blue-700/60 via-blue-500/30 to-transparent",
  },
  {
    icon: <LucideHome className="w-5 h-5" />,
    title: "For Parents",
    description: "Balance family time, focus during dinner",
    img: "/family.png",
    gradient: "from-orange-600/60 via-orange-400/30 to-transparent",
  },
  {
    icon: <LucideHeart className="w-5 h-5" />,
    title: "For Wellbeing",
    description: "Fight addiction, reconnect with nature, alleviate anxiety",
    img: "/personal.png",
    gradient: "from-green-600/60 via-green-400/30 to-transparent",
  },
];

export default function FocusCards() {
  return (
    <div className="bg-black py-12 px-4 sm:px-6 lg:px-8 text-white">
      <h2 className="text-4xl font-bold text-center mb-4">Better Focus to Everyone</h2>
      <p className="text-center text-gray-400 mb-12">
        Focus is essential to all parts of life. <br />
        Find out how Opal can help you focus on what matters most to you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {focusData.map((item, i) => (
          <Card
            key={i}
            className="relative overflow-hidden rounded-3xl shadow-xl h-[320px] group transition transform hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Background Image */}
            <img
              src={item.img}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition duration-200 ease-in-out group-hover:blur-sm"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${item.gradient} z-2`}
            />

            {/* Content */}
            <CardContent className="relative z-20 h-full flex flex-col justify-end p-6 text-left text-white">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <span className="font-semibold text-lg">{item.title}</span>
              </div>
              <p className="text-sm text-white/90">{item.description}</p>
              {(
                <p className="text-xs text-white/70 mt-2"></p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer/>
    </div>
     
  );
}