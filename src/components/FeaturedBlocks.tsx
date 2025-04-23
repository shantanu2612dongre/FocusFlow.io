
import { LucideHammer, LucideBriefcase, LucideClock3} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const blocks = [
  {
    title: "BRICK MODE",
    label: "Brick Phone Mode",
    time: "Always On, Deep Focus",
    description: "Temporarily brick your phone, only essential apps are allowed.",
    icon: <LucideHammer className="w-5 h-5" />,
    bg: "/images/brick.jpg",
  },
  {
    title: "Work Hours",
    label: "Work Hours",
    time: "Weekdays, 9AM - 5PM",
    description: "Keep distractions away during your optimal productive hours.",
    icon: <LucideBriefcase className="w-5 h-5" />,
    bg: "/images/work-hours.jpg",
  },
  {
    title: "CRUNCH TIME",
    label: "Crunch Time",
    time: "One Off, 1h 30m",
    description: "Go all in for a short sprint to meet that deadline.",
    icon: <LucideClock3 className="w-5 h-5" />,
    bg: "/images/crunch.jpg",
  },
  {
    title: "GODMODE FOCUS",
    label: "Godmode Focus",
    time: "Every day, 2PM - 3PM",
    description: "Commit to an hour of distraction-free work every afternoon.",
    icon: <LucideClock3 className="w-5 h-5" />,
    bg: "/images/godmode.jpg",
  },
];

export default function FeaturedBlocks() {
  return (
    <div id="blocks" className="bg-black text-white px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-4">Featured Blocks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {blocks.map((block, i) => (
          <Card
            key={i}
            className="relative overflow-hidden rounded-3xl shadow-xl h-[340px] group"
          >
            <img
              src={block.bg}
              alt={block.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:blur-sm transition duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

            <CardContent className="relative z-20 h-full flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold mb-1">{block.title}</h3>
              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                {block.icon}
                <span>{block.label}</span>
              </div>
              <p className="text-xs text-white/70">{block.time}</p>
              <p className="text-sm mt-2 text-white/90">{block.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}