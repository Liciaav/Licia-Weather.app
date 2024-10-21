import dotenv from 'dotenv';
import axios from 'axios'; 
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  icon: any;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(icon: any, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
console.log(Weather);

// TODO: Complete the WeatherService class
class WeatherService {
  constructor() {
    this.baseURL = process.env.API_BASE_URL;
    this.apiKey = process.env.API_KEY;
  }

  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await axios.get(`${this.baseURL}/geocode/v1/json`, {
      params: {
        q: query,
        key: this.apiKey,
      },
    }
    )};
    return this.destructureLocationData(response.data);
  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
    lat: locationData.results[0].geometry.location.lat,
    lon: locationData.results[0].geometry.location.lng,
  };
}
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geocode/v1/json?q=${encodeURIComponent(city)}&key=${this.apiKey}`;
}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
}
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string) {
    const url = this.buildGeocodeQuery(query);
    const response = await axios.get(url);
    return this.destructureLocationData(response.data);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates):any {
    const response = await axios.get(this.buildWeatherQuery(coordinates));
    return this.parseCurrentWeather(response.data);
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {return new Weather(
    response.main.temp,
    response.wind.speed,
    response.main.humidity,
    response.weather[0].icon,
    response.weather[0].description
  );
}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return weatherData;
  }
}

export default new WeatherService();

