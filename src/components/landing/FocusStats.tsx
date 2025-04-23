'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Average time saved thanks to FocusFlow', time: '1h 23m' },
  { label: 'Over the past 30 days', time: '2h 05m' },
  { label: 'Over the past 90 days', time: '3h 12m' }
];

export default function FocusStatsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stats.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-black via-[#020617] to-black text-center">
      <div>
      <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Impact</span>
        <motion.h2
          key={stats[index].label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
        >
          {stats[index].label}
        </motion.h2>

        <motion.div
          key={stats[index].time}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[64px] font-bold text-white"
        >
          {stats[index].time}
        </motion.div>

        <p className="text-gray-400 mt-2">saved daily</p>
      </div>
    </section>
  );
}