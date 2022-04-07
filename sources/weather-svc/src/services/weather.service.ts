import { WeatherApi } from './weather.api';
import { Inject } from 'typescript-ioc';
import { LoggerApi } from '../logger';
import fetch from 'node-fetch';

export class WeatherService implements WeatherApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('Weather Service');
  }

  async weather(city: string = 'New York'): Promise<string> {
    this.logger.info(`Getting weather for ${city}`);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=<<apikey>>';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json());
    return result;
  }

}
