import { Router, type Request, type Response } from 'express';
import HistoryService from '../service/historyService.ts';
import WeatherService from '../service/weatherService.ts';

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
    const weatherData = await WeatherService.WheatherByCity(cityName);
  // TODO: save city to search history
  await HistoryService.addCity({
    city:cityName,
    date:new Date(),
  })
    return res.status(200).json(weatherData);
  } catch (erro){
    return res.status(500).json({erro: 'Failed to retrive wearther data.'});
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {try {
  const history = await HistoryService.getCities();
  return res.status(200).json(history);
} catch (error) {
  return res.status(500).json({ error: 'Failed to retrieve search history.' });
}
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {const { id } = req.params;
try {
  await HistoryService.removeCity(id);
  return res.status(204).send(); // No content
} catch (error) {
  return res.status(500).json({ error: 'Failed to delete city from history.' });
}
});
}

export default router;
