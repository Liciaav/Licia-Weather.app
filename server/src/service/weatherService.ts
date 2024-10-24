import dotenv from 'dotenv'; 
import dayjs, { type Dayjs } from 'dayjs';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
}

// Define a class for the Weather object
class Weather {
  city: string;
  date: Dayjs | string;
  icon: string; // changed to string for icon URL or ID
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: Dayjs | string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// Complete the WeatherService class
class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Coordinates[] = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error; 
    }
  }

  // Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      name: locationData.name,
      country: locationData.country,
      state: locationData.state,
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&appid=${this.apiKey}`;
  }

  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string) {
    const url = this.buildGeocodeQuery(query);
    const response = await this.fetchLocationData(url);
    return this.destructureLocationData(response);
  }

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    const currentWeather: Weather = this.parseCurrentWeather(data);
    const forecast: Weather[] = this.buildForecastArray(currentWeather, data.list);
    return forecast;
  }

  // Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.city.name,
      dayjs(response.dt * 1000), 
      response.weather[0].icon,
      response.weather[0].description,
      response.main.temp,
      response.wind.speed,
      response.main.humidity
    );
  }

  // Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map(item => new Weather(
      currentWeather.city,
      dayjs(item.dt * 1000),
      item.weather[0].icon,
      item.weather[0].description,
      item.main.temp,
      item.wind.speed,
      item.main.humidity
    ));
  }

  // Complete getWeatherForCity method
  async getWeatherForCity(city: string){
    const coordinates = await this.fetchAndDestructureLocationData(city);
    if (coordinates) {
      const weatherData = await this.fetchWeatherData(coordinates);
      return weatherData;
    }
    throw new Error('No coordinates found');
  }
}

export default new WeatherService();
