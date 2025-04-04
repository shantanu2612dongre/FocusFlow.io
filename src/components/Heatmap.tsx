
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Mock data for the heatmap
type HeatmapData = {
  date: string;
  value: number;
}[];

const getDaysArray = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const getMonthsArray = () => {
  return [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
};

export function Heatmap() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  // Generate mock data for the current year
  const generateMockData = (): HeatmapData => {
    const data: HeatmapData = [];
    
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        // Only add data for dates up to today
        const date = new Date(currentYear, month, day);
        if (date > today) continue;
        
        // Generate a random value between 0-4
        const value = Math.floor(Math.random() * 5);
        
        data.push({
          date: `${currentYear}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
          value
        });
      }
    }
    
    return data;
  };
  
  const heatmapData = generateMockData();
  
  // Function to get intensity class based on value
  const getIntensityClass = (value: number) => {
    if (value === 0) return "heatmap-cell-0";
    if (value === 1) return "heatmap-cell-1";
    if (value === 2) return "heatmap-cell-2";
    if (value === 3) return "heatmap-cell-3";
    return "heatmap-cell-4";
  };
  
  // Function to get formatted date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Function to get hours text
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
              <div className="w-8"></div>
              {getMonthsArray().map((month, index) => (
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
                        const dateStr = `${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                        const dataPoint = heatmapData.find(d => d.date === dateStr);
                        
                        // Skip future dates
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
                                ></motion.div>
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
                <div className="w-3 h-3 rounded-sm heatmap-cell-0"></div>
                <div className="w-3 h-3 rounded-sm heatmap-cell-1"></div>
                <div className="w-3 h-3 rounded-sm heatmap-cell-2"></div>
                <div className="w-3 h-3 rounded-sm heatmap-cell-3"></div>
                <div className="w-3 h-3 rounded-sm heatmap-cell-4"></div>
              </div>
              <span className="text-xs text-futuristic-text-secondary">More</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
