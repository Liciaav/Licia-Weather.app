import { Router, type Request, type Response } from 'express';

import HistoryService from './server/src/service/historyService.ts';
import WeatherService from './server/src/service/weatherService.ts';

console.log(process.env.API_KEY);
console.log(process.env.API_BASE_URL);

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const{cityName} = req.body;
  if (!cityName) {
    return res.status(400).json({erro: 'City name is required.'});
  }
  try{
    const weatherData = await WeatherService. get WheatherByCity(cityName);
  // TODO: save city to search history
  await HistoryService.saveCityToHistory(cityName);
  return res.status(200).json(weatherData);
  } catch (erro){
    return res.status(500).json({erro: 'Failed to retrive wearther data.'});
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
