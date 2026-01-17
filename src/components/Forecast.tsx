'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudLightning, Wind } from 'lucide-react';

interface DayForecast {
  date: string;
  day: string;
  high_f: number;
  low_f: number;
  high_c: number;
  low_c: number;
  condition: string;
  precip: number;
}

interface ForecastProps {
  days: DayForecast[];
  unit: 'F' | 'C';
}

export default function Forecast({ days, unit }: ForecastProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-bold text-white mb-4 px-2">10-Day Forecast</h2>
      <div className="flex flex-col gap-2">
        {days.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-24">
              <p className="font-semibold text-white">{day.day}</p>
              <p className="text-xs text-white/40">{day.date}</p>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-center">
              <WeatherIcon condition={day.condition} />
              <div className="hidden sm:flex items-center gap-1 text-blue-400 text-xs font-medium w-12">
                <CloudRain className="w-3 h-3" />
                {day.precip}%
              </div>
            </div>

            <div className="flex items-center gap-6 w-32 justify-end">
              <span className="text-white font-bold w-12 text-right">
                {Math.round(unit === 'F' ? day.high_f : day.high_c)}°
              </span>
              <div className="h-1.5 w-16 bg-white/10 rounded-full relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 bg-blue-500 rounded-full" 
                  style={{ left: '25%', right: '25%' }}
                />
              </div>
              <span className="text-white/40 w-12">
                {Math.round(unit === 'F' ? day.low_f : day.low_c)}°
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WeatherIcon({ condition }: { condition: string }) {
  const c = condition.toLowerCase();
  if (c.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-400" />;
  if (c.includes('storm') || c.includes('lightning')) return <CloudLightning className="w-6 h-6 text-purple-400" />;
  if (c.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-300" />;
  if (c.includes('wind')) return <Wind className="w-6 h-6 text-teal-400" />;
  return <Sun className="w-6 h-6 text-yellow-400" />;
}
