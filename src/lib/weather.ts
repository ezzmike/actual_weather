const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
}

export interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  precip: number;
}

export async function getWeatherData(query: string) {
  if (!API_KEY) {
    // Return mock data if no API key is provided
    return {
      current: {
        city: query,
        temp: 72,
        condition: 'Partly Cloudy',
        high: 78,
        low: 65,
        humidity: 45,
        windSpeed: 10,
        precipitation: 5,
        icon: 'cloudy'
      },
      forecast: Array.from({ length: 10 }).map((_, i) => ({
        day: new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short' }),
        date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high: 70 + Math.random() * 10,
        low: 60 + Math.random() * 5,
        condition: ['Sun', 'Cloudy', 'Rain', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        precip: Math.floor(Math.random() * 100)
      }))
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=10&aqi=no&alerts=no`);
    const data = await res.json();

    if (data.error) throw new Error(data.error.message);

    return {
      current: {
        city: `${data.location.name}, ${data.location.region}`,
        temp: data.current.temp_f,
        condition: data.current.condition.text,
        high: data.forecast.forecastday[0].day.maxtemp_f,
        low: data.forecast.forecastday[0].day.mintemp_f,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_mph,
        precipitation: data.current.precip_in,
        icon: data.current.condition.text
      },
      forecast: data.forecast.forecastday.map((day: any) => ({
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high: day.day.maxtemp_f,
        low: day.day.mintemp_f,
        condition: day.day.condition.text,
        precip: day.day.daily_chance_of_rain
      }))
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
}
