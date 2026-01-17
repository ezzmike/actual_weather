'use client';

import React from 'react';
import { Wind, Droplets, Thermometer, Sun, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

interface CurrentWeatherProps {
  data: {
    city: string;
    temp_f: number;
    temp_c: number;
    condition: string;
    high_f: number;
    high_c: number;
    low_f: number;
    low_c: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    icon: string;
  };
  unit: 'F' | 'C';
}

export default function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const temp = unit === 'F' ? data.temp_f : data.temp_c;
  const high = unit === 'F' ? data.high_f : data.high_c;
  const low = unit === 'F' ? data.low_f : data.low_c;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{data.city}</h1>
          <p className="text-lg text-white/70 capitalize">{data.condition}</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-8xl font-black">{Math.round(temp)}°</span>
            <div className="flex flex-col text-lg text-white/80">
              <span>H: {Math.round(high)}°</span>
              <span>L: {Math.round(low)}°</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end w-full md:w-auto">
          {/* Main Weather Icon Placeholder - would be replaced by actual SVG/Animated icons */}
          <div className="w-32 h-32 md:w-48 md:h-48 relative mb-4">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {data.condition.toLowerCase().includes('rain') ? (
                <CloudRain className="w-full h-full text-blue-400" />
              ) : (
                <Sun className="w-full h-full text-yellow-400" />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
        <WeatherDetail icon={<Wind className="w-5 h-5" />} label="Wind" value={`${data.windSpeed} mph`} />
        <WeatherDetail icon={<Droplets className="w-5 h-5" />} label="Humidity" value={`${data.humidity}%`} />
        <WeatherDetail icon={<CloudRain className="w-5 h-5" />} label="Precip" value={`${data.precipitation}%`} />
        <WeatherDetail icon={<Thermometer className="w-5 h-5" />} label="Feels Like" value={`${Math.round(temp - 2)}°`} />
      </div>
    </motion.div>
  );
}

function WeatherDetail({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
      <div className="text-blue-400">{icon}</div>
      <div>
        <p className="text-xs text-white/50">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
