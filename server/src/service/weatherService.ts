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
  constructor(tempF, windSpeed, humidity, icon, iconDescription) {
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}
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
    });
    return this.destructureLocationData(response.data);
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {return {
    lat: locationData.results[0].geometry.location.lat,
    lon: locationData.results[0].geometry.location.lng,
  };
}
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
}
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): any {const response = await axios.get(this.buildWeatherQuery(coordinates));
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
