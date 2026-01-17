'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import WeatherMap from './WeatherMap';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWeather } from '@/app/actions';
import { Shuffle } from 'lucide-react';

const RANDOM_CITIES = [
  'Tokyo', 'Paris', 'New York', 'Sydney', 'Cairo', 
  'Reykjavik', 'Rio de Janeiro', 'Moscow', 'Cape Town', 'Bangkok',
  'Anchorage', 'Honolulu', 'Dubai', 'Mumbai', 'Mexico City',
  'Oslo', 'Athens', 'Nairobi', 'Seoul', 'Lima'
];

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState('from-blue-600 to-blue-900');
  const [unit, setUnit] = useState<'F' | 'C'>('F');

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
      
      // Dynamic background based on condition and time of day
      const condition = data.current.condition.toLowerCase();
      const isDay = data.current.isDay;

      if (!isDay) {
        // Night gradients
        if (condition.includes('rain')) setBgGradient('from-slate-900 to-black');
        else if (condition.includes('cloud')) setBgGradient('from-slate-800 to-indigo-950');
        else setBgGradient('from-indigo-950 to-black');
      } else {
        // Day gradients
        if (condition.includes('rain')) setBgGradient('from-slate-700 to-slate-900');
        else if (condition.includes('cloud')) setBgGradient('from-blue-400 to-indigo-800');
        else if (condition.includes('sun') || condition.includes('clear')) setBgGradient('from-amber-400 to-blue-600');
        else setBgGradient('from-blue-600 to-blue-900');
      }

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

  const handleRandomWeather = () => {
    const randomCity = RANDOM_CITIES[Math.floor(Math.random() * RANDOM_CITIES.length)];
    handleSearch(randomCity);
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${bgGradient} p-4 md:p-8 transition-colors duration-1000`}>
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-6 items-center w-full">
          <div className="w-full flex justify-between items-center max-w-2xl">
            <div className="w-10 h-10" /> {/* Spacer */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h1 className="text-white text-5xl font-black italic tracking-tight">Just The Weather</h1>
            </motion.div>
            
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 flex gap-1">
              <button
                onClick={() => setUnit('F')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${unit === 'F' ? 'bg-white text-blue-600 shadow-lg' : 'text-white/60 hover:text-white'}`}
                title="Fahrenheit (American)"
              >
                °F <span className="opacity-50 font-normal">🇺🇸</span>
              </button>
              <button
                onClick={() => setUnit('C')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${unit === 'C' ? 'bg-white text-blue-600 shadow-lg' : 'text-white/60 hover:text-white'}`}
                title="Celsius (Everybody Else)"
              >
                °C <span className="opacity-50 font-normal">🌍</span>
              </button>
            </div>
          </div>
          
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
                <CurrentWeather data={weatherData} unit={unit} />
                <WeatherMap lat={weatherData.lat} lon={weatherData.lon} />
                <Forecast days={forecastData} unit={unit} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="text-center pt-12 pb-4 space-y-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRandomWeather}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white font-medium transition-all shadow-xl"
          >
            <Shuffle className="w-4 h-4" />
            Random Weather
          </motion.button>
          <p className="text-white/20 text-xs">I swear I'm not tracking you.</p>
        </footer>
      </div>
    </div>
  );
}
