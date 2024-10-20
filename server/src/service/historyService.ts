import fs from 'fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define a City class with name and id properties
class City {
  constructor(city, date, icon, iconDescription, tempF, windSpeed, humidity) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  constructor() {
    this.filePath = path.join(__dirname, 'searchHistory.json'); // Adjust the path as necessary
  }
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // File doesn't exist, return empty array
    }
    throw error; // Other errors
  }
}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const citiesData = await this.read();
    return citiesData.map(city => new City(
      city.city,
      city.date,
      city.icon,
      city.iconDescription,
      city.tempF,
      city.windSpeed,
      city.humidity
    ));
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    const newCity = new City(
      cityData.city,
      cityData.date,
      cityData.icon,
      cityData.iconDescription,
      cityData.tempF,
      cityData.windSpeed,
      cityData.humidity
    );
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) { const cities = await this.getCities();
    const updatedCities = cities.filter((city, index) => index.toString() !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
