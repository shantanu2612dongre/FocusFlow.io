import React, { useState, useEffect } from 'react';
import { Dashboard } from '../components/Dashboard';
import SessionTracker from './SessionTracker';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalHours: 0,
    sessionsCompleted: 0,
    dailyStreak: 0,
    tasksCompleted: 0, // we’ll handle this later
  });

  useEffect(() => {
    const totalHours = parseFloat(localStorage.getItem('totalHours') || '0');
    const sessionsCompleted = parseInt(localStorage.getItem('sessionsCompleted') || '0');
    const dailyStreak = parseInt(localStorage.getItem('dailyStreak') || '0');

    setStats({ totalHours, sessionsCompleted, dailyStreak, tasksCompleted: 0 });
  }, []);

  return (
    <div className="p-4">
      <Dashboard stats={stats} />
      <SessionTracker updateStats={(newStats) =>
        setStats((prev) => ({ ...prev, ...newStats }))
      } />
    </div>
  );
};

export default DashboardPage;