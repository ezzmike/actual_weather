'use server';

import { getWeatherData } from '@/lib/weather';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';

export async function fetchWeather(query: string) {
  try {
    return await getWeatherData(query);
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}

export async function searchLocations(query: string) {
  if (!query || query.length < 3) return [];
  
  try {
    const res = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
    const data = await res.json();
    
    if (data.error) return [];
    
    return data.map((item: any) => ({
      label: `${item.name}${item.region ? `, ${item.region}` : ''}, ${item.country}`,
      name: item.name,
      value: item.url || `${item.lat},${item.lon}`
    }));
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
