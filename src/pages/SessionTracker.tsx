import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SessionTrackerProps {
  updateStats: (stats: {
    totalHours: number;
    sessionsCompleted: number;
    dailyStreak: number;
    tasksCompleted: number;
  }) => void;
}

const SessionTracker: React.FC<SessionTrackerProps> = ({ updateStats }) => {
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const now = new Date();
    const lastCompletedDate = localStorage.getItem("lastCompletedDate");
    const streak = parseInt(localStorage.getItem("dailyStreak") || "0");

    if (lastCompletedDate) {
      const lastDate = new Date(lastCompletedDate);
      const diff = Math.floor(
        (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diff === 1) {
        localStorage.setItem("dailyStreak", String(streak));
      } else if (diff > 1) {
        localStorage.setItem("dailyStreak", "0");
      }
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startSession = () => {
    setSessionStartTime(Date.now());
    setTimeLeft(25 * 60);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          endSession(true); // session completed normally
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endSession = (completed = false) => {
    if (!sessionStartTime) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const endTime = Date.now();
    const durationInHours = (endTime - sessionStartTime) / (1000 * 60 * 60);

    const prevTotalHours = parseFloat(localStorage.getItem("totalHours") || "0");
    const prevSessions = parseInt(localStorage.getItem("sessionsCompleted") || "0");
    let streak = parseInt(localStorage.getItem("dailyStreak") || "0");

    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem("lastCompletedDate");

    if (lastCompleted !== today) {
      streak += 1;
      localStorage.setItem("lastCompletedDate", today);
      localStorage.setItem("dailyStreak", String(streak));
    }

    const updatedStats = {
      totalHours: prevTotalHours + durationInHours,
      sessionsCompleted: prevSessions + 1,
      dailyStreak: streak,
      tasksCompleted: 0,
    };

    localStorage.setItem("totalHours", String(updatedStats.totalHours));
    localStorage.setItem("sessionsCompleted", String(updatedStats.sessionsCompleted));

    updateStats(updatedStats);
    setSessionStartTime(null);
    setTimeLeft(25 * 60);

    if (completed) {
      setShowPopup(true);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-4 items-center">
      <div className="text-4xl font-mono">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={startSession}
          disabled={!!sessionStartTime}
        >
          Start Deep Work
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => endSession(false)}
          disabled={!sessionStartTime}
        >
          End Session
        </button>
      </div>

      {/* 🎉 Completion Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-xl rounded-xl p-6 z-50 text-center max-w-sm w-full"
          >
            <h2 className="text-xl font-semibold mb-2">🎉 Session Complete!</h2>
            <p className="mb-4">Great job staying focused. Keep it up!</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Awesome!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SessionTracker;