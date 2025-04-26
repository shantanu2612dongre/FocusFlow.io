"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fetchHeatmapData, supabase } from "@/lib/supabaseClient";

type HeatmapData = {
  date: string;
  value: number;
}[];

const getFixedDaysArray = () => Array.from({ length: 31 }, (_, i) => i + 1);

const getMonthsArray = () => [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function Heatmap() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [heatmapData, setHeatmapData] = useState<HeatmapData>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
  
      const data = await fetchHeatmapData(user.id, selectedYear, selectedMonth); // Pass year/month
      if (data.length > 0) {
        setHeatmapData(data);
      } else {
        setHeatmapData([]);
      }
    };
  
    fetchData();
  }, [selectedMonth, selectedYear]); // Dependency add karo

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
    if (value === 1) return "1–2 hours";
    if (value === 2) return "2–4 hours";
    if (value === 3) return "4–6 hours";
    return "6+ hours";
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    const now = new Date();
    const isNextMonthInFuture =
      selectedYear > now.getFullYear() ||
      (selectedYear === now.getFullYear() && selectedMonth >= now.getMonth());
  
    if (isNextMonthInFuture) return;
  
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
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
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handlePrevMonth}
                className="text-sm text-futuristic-text-secondary hover:underline"
              >
                ← Previous
              </button>
              <div className="text-lg font-semibold text-futuristic-text-primary">
                {getMonthsArray()[selectedMonth]} {selectedYear}
              </div>
              <button
                onClick={handleNextMonth}
                className="text-sm text-futuristic-text-secondary hover:underline"
              >
                Next →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getFixedDaysArray().map((day) => {
                const dateStr = `${selectedYear}-${(selectedMonth + 1)
                  .toString()
                  .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                const date = new Date(dateStr);
                if (date > today) return null;

                const dataPoint = heatmapData.find((d) => d.date === dateStr);

                return (
                  <TooltipProvider key={dateStr}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className={cn(
                            "w-4 h-4 rounded-sm",
                            dataPoint ? getIntensityClass(dataPoint.value) : "heatmap-cell-0"
                          )}
                          whileHover={{ scale: 1.3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-futuristic-dark-gray border border-futuristic-purple/30">
                        <p className="font-medium text-futuristic-text-primary">
                          {formatDate(dateStr)}
                        </p>
                        <p className="text-xs text-futuristic-text-secondary">
                          {dataPoint ? getHoursText(dataPoint.value) : "No data"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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