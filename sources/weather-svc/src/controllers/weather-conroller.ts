import {GET, Path, PathParam} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {WeatherApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/weather')
export class WeatherController {

  @Inject
  service: WeatherApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('WeatherController');
  }

  @Path(':city')
  @GET
  async sayHello(@PathParam('city') city: string): Promise<string> {
    this.logger.info(`Getting weather for ${city}`);
    return this.service.weather(city);
  }
}
