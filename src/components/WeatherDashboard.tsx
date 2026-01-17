'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWeather } from '@/app/actions';

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState('from-blue-600 to-blue-900');

  useEffect(() => {
    // Initial load with a default city
    handleSearch('London');
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(query);
      setWeatherData(data.current);
      setForecastData(data.forecast);
      
      // Dynamic background based on condition
      const condition = data.current.condition.toLowerCase();
      if (condition.includes('rain')) setBgGradient('from-slate-700 to-slate-900');
      else if (condition.includes('cloud')) setBgGradient('from-blue-400 to-indigo-800');
      else if (condition.includes('sun') || condition.includes('clear')) setBgGradient('from-amber-400 to-blue-600');
      else setBgGradient('from-blue-600 to-blue-900');

    } catch (err) {
      setError('Could not find location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSearch(`${position.coords.latitude},${position.coords.longitude}`);
        },
        () => {
          setError('Geolocation permission denied.');
        }
      );
    }
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${bgGradient} p-4 md:p-8 transition-colors duration-1000`}>
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-6 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="text-white/40 text-sm font-bold tracking-[0.2em] uppercase mb-2">Supremely Robust</h1>
            <h2 className="text-white text-5xl font-black italic">WEATHER.OS</h2>
          </motion.div>
          
          <SearchBar onSearch={handleSearch} onLocationClick={handleLocationClick} />
        </header>

        <main className="relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-white/50 animate-pulse">Syncing with satellites...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-red-400 font-medium">{error}</p>
                <button 
                  onClick={() => handleSearch('London')}
                  className="mt-4 text-white/50 hover:text-white underline"
                >
                  Try again
                </button>
              </motion.div>
            ) : weatherData && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <CurrentWeather data={weatherData} />
                <Forecast days={forecastData} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="text-center pt-12 pb-4">
          <p className="text-white/20 text-xs">Powered by Hyper-Robust Data Streams &bull; © 2026</p>
        </footer>
      </div>
    </div>
  );
}
