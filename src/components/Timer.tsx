
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient"; // make sure this path is correct

async function logDeepWorkSession(durationMinutes: number) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not authenticated:", userError);
    return;
  }

  const { error: insertError } = await supabase.from("sessions").insert([
    {
      user_id: user.id,
      duration_minutes: durationMinutes,
      tasks_completed: 0, // or update this if you're tracking tasks
      date: new Date().toISOString()
    }
  ]);

  if (insertError) {
    console.error("Failed to insert session:", insertError);
  } else {
    console.log("Session logged to Supabase!");
  }
}

interface TimerProps {
  onSessionComplete: (sessionType: string, duration: number) => void;
}

export function Timer({ onSessionComplete }: TimerProps) {
  const [mode, setMode] = useState<"work" | "rest">("work");
  const [workDuration, setWorkDuration] = useState<number>(60); // in minutes
  const [restDuration, setRestDuration] = useState<number>(5); // in minutes
  const [timeLeft, setTimeLeft] = useState<number>(workDuration * 60); // in seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(workDuration * 60);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Update timeLeft when durations change and timer is not active
    if (!isActive) {
      if (mode === "work") {
        setTimeLeft(workDuration * 60);
        setInitialTime(workDuration * 60);
      } else {
        setTimeLeft(restDuration * 60);
        setInitialTime(restDuration * 60);
      }
    }
  }, [workDuration, restDuration, mode, isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
      onSessionComplete(mode, initialTime);
  
      if (mode === "work") {
        const durationInMinutes = Math.round(initialTime / 60);
        logDeepWorkSession(durationInMinutes);
      }
  
      // Switch modes
      if (mode === "work") {
        setMode("rest");
        setTimeLeft(restDuration * 60);
        setInitialTime(restDuration * 60);
      } else {
        setMode("work");
        setTimeLeft(workDuration * 60);
        setInitialTime(workDuration * 60);
      }
    }
  }, [timeLeft, mode, initialTime, onSessionComplete, workDuration, restDuration]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "work") {
      setTimeLeft(workDuration * 60);
    } else {
      setTimeLeft(restDuration * 60);
    }
  };

  const setWorkMode = () => {
    if (isActive) return; // Don't switch while active
    setMode("work");
    setTimeLeft(workDuration * 60);
    setInitialTime(workDuration * 60);
  };

  const setRestMode = () => {
    if (isActive) return; // Don't switch while active
    setMode("rest");
    setTimeLeft(restDuration * 60);
    setInitialTime(restDuration * 60);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  const handleWorkDurationChange = (value: number[]) => {
    setWorkDuration(value[0]);
  };

  const handleRestDurationChange = (value: number[]) => {
    setRestDuration(value[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto shadow-lg border-2 hover:border-primary/20 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Deep Work Timer</CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={mode === "work" ? "default" : "secondary"}
              className={cn(
                "text-md px-3 py-1 transition-all duration-300",
                mode === "work" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {mode === "work" ? "Working" : "Resting"}
            </Badge>
            
            <Popover open={isEditing} onOpenChange={setIsEditing}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" disabled={isActive} className="transition-all duration-200 hover:bg-accent">
                  <Edit className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Timer Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Customize your work and rest durations.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="work">Work:</Label>
                      <div className="col-span-2 flex items-center gap-2">
                        <Slider
                          id="work"
                          defaultValue={[workDuration]}
                          max={120}
                          min={1}
                          step={1}
                          onValueChange={handleWorkDurationChange}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{workDuration}m</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="rest">Rest:</Label>
                      <div className="col-span-2 flex items-center gap-2">
                        <Slider
                          id="rest"
                          defaultValue={[restDuration]}
                          max={30}
                          min={1}
                          step={1}
                          onValueChange={handleRestDurationChange}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{restDuration}m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <motion.div 
              className="text-7xl font-bold py-8"
              key={timeLeft}
              initial={{ opacity: 0.8, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {formatTime(timeLeft)}
            </motion.div>
          </div>
          
          <div className="mb-6 h-2 bg-primary/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="flex gap-4 mb-6">
            <Button 
              className={cn(
                "flex-1 transition-all duration-200",
                mode === "work" ? "bg-primary" : "bg-muted text-muted-foreground"
              )}
              onClick={setWorkMode}
              disabled={isActive}
            >
              Work ({workDuration}min)
            </Button>
            <Button 
              className={cn(
                "flex-1 transition-all duration-200",
                mode === "rest" ? "bg-primary" : "bg-muted text-muted-foreground"
              )}
              onClick={setRestMode}
              disabled={isActive}
            >
              Rest ({restDuration}min)
            </Button>
          </div>
          
          <div className="flex gap-4">
            <motion.div 
              className="flex-1"
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="w-full text-lg font-semibold transition-all duration-200" 
                onClick={toggleTimer}
              >
                {isActive ? (
                  <><Pause className="mr-2 h-5 w-5" /> Pause</>
                ) : (
                  <><Play className="mr-2 h-5 w-5" /> Start</>
                )}
              </Button>
            </motion.div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={resetTimer}
              disabled={isActive}
              className="transition-all duration-200 hover:bg-accent"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
