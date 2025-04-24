"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fetchHeatmapData } from '@/lib/supabaseClient'; supabaseClient"; // Import fetchHeatmapData

type HeatmapData = {
  date: string;
  value: number;
}[];

const getDaysArray = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const getMonthsArray = () => [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function Heatmap() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const [heatmapData, setHeatmapData] = useState<HeatmapData>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Use the fetchHeatmapData function
      const data = await fetchHeatmapData(user.id);

      if (data.length > 0) {
        setHeatmapData(data);
      }
    };

    fetchData();
  }, []);

  const getIntensityClass = (value: number) => {
    if (value === 0) return "heatmap-cell-0";
    if (value === 1) return "heatmap-cell-1";
    if (value === 2) return "heatmap-cell-2";
    if (value === 3) return "heatmap-cell-3";
    return "heatmap-cell-4";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getHoursText = (value: number) => {
    if (value === 0) return "No hours";
    if (value === 1) return "1-2 hours";
    if (value === 2) return "2-4 hours";
    if (value === 3) return "4-6 hours";
    return "6+ hours";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full shadow-lg bg-futuristic-dark-gray border border-futuristic-purple/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-neon-gradient bg-clip-text text-transparent">
            Deep Work Contributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex mb-2">
              <div className="w-8" />
              {getMonthsArray().map(month => (
                <div key={month} className="flex-1 text-center text-xs text-futuristic-text-secondary">
                  {month}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap">
              {getMonthsArray().map((month, monthIndex) => {
                const daysInThisMonth = getDaysArray(currentYear, monthIndex + 1);

                return (
                  <div key={month} className="flex-1">
                    <div className="grid grid-cols-7 gap-1">
                      {daysInThisMonth.map((day) => {
                        const dateStr = `${currentYear}-${(monthIndex + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                        const dataPoint = heatmapData.find(d => d.date === dateStr);
                        const date = new Date(dateStr);
                        if (date > today) return null;

                        return (
                          <TooltipProvider key={dateStr}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div
                                  className={cn(
                                    "w-3 h-3 rounded-sm",
                                    dataPoint ? getIntensityClass(dataPoint.value) : "heatmap-cell-0"
                                  )}
                                  whileHover={{ scale: 1.3 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="bg-futuristic-dark-gray border border-futuristic-purple/30">
                                <p className="font-medium text-futuristic-text-primary">{formatDate(dateStr)}</p>
                                <p className="text-xs text-futuristic-text-secondary">
                                  {dataPoint ? getHoursText(dataPoint.value) : "No data"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end mt-4 gap-2">
              <span className="text-xs text-futuristic-text-secondary">Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm heatmap-cell-0" />
                <div className="w-3 h-3 rounded-sm heatmap-cell-1" />
                <div className="w-3 h-3 rounded-sm heatmap-cell-2" />
                <div className="w-3 h-3 rounded-sm heatmap-cell-3" />
                <div className="w-3 h-3 rounded-sm heatmap-cell-4" />
              </div>
              <span className="text-xs text-futuristic-text-secondary">More</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}