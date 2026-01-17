'use server';

import { getWeatherData } from '@/lib/weather';

export async function fetchWeather(query: string) {
  try {
    return await getWeatherData(query);
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}
