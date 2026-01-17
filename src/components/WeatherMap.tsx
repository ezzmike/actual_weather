'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WeatherMapProps {
  lat: number;
  lon: number;
}

export default function WeatherMap({ lat, lon }: WeatherMapProps) {
  // Constructing Windy.com iframe URL
  const mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=5&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-8 overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
    >
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Live Satellite & Radar</h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Live Stream</span>
        </div>
      </div>
      <div className="relative w-full h-[450px]">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          className="grayscale-[0.2] contrast-[1.1]"
          title="Satellite Weather Map"
        />
      </div>
    </motion.div>
  );
}
