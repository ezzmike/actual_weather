const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherData {
  city: string;
  lat: number;
  lon: number;
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
}

export interface ForecastDay {
  day: string;
  date: string;
  high_f: number;
  high_c: number;
  low_f: number;
  low_c: number;
  condition: string;
  precip: number;
}

export async function getWeatherData(query: string) {
  if (!API_KEY) {
    // Return mock data if no API key is provided
    const mockF = 72;
    const mockC = (mockF - 32) * (5 / 9);
    return {
      current: {
        city: query,
        lat: 51.5074,
        lon: -0.1278,
        temp_f: mockF,
        temp_c: mockC,
        condition: 'Partly Cloudy',
        high_f: 78,
        high_c: 25.5,
        low_f: 65,
        low_c: 18.3,
        humidity: 45,
        windSpeed: 10,
        precipitation: 5,
        icon: 'cloudy'
      },
      forecast: Array.from({ length: 10 }).map((_, i) => ({
        day: new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short' }),
        date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high_f: 70 + Math.random() * 10,
        high_c: 21 + Math.random() * 5,
        low_f: 60 + Math.random() * 5,
        low_c: 15 + Math.random() * 3,
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
        lat: data.location.lat,
        lon: data.location.lon,
        temp_f: data.current.temp_f,
        temp_c: data.current.temp_c,
        condition: data.current.condition.text,
        high_f: data.forecast.forecastday[0].day.maxtemp_f,
        high_c: data.forecast.forecastday[0].day.maxtemp_c,
        low_f: data.forecast.forecastday[0].day.mintemp_f,
        low_c: data.forecast.forecastday[0].day.mintemp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_mph,
        precipitation: data.current.precip_in,
        icon: data.current.condition.text
      },
      forecast: data.forecast.forecastday.map((day: any) => ({
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        high_f: day.day.maxtemp_f,
        high_c: day.day.maxtemp_c,
        low_f: day.day.mintemp_f,
        low_c: day.day.mintemp_c,
        condition: day.day.condition.text,
        precip: day.day.daily_chance_of_rain
      }))
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
}
