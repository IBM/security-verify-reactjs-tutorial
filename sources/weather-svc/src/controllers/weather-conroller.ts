import { GET, Path, PathParam, HeaderParam } from 'typescript-rest';
import { Inject } from 'typescript-ioc';
import { WeatherApi } from '../services';
import { LoggerApi } from '../logger';
import fetch from 'node-fetch';

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
  async sayHello(@HeaderParam('Authorization') accesstoken: string, @PathParam('city') city: string): Promise<string> {
    this.logger.info(`Token ${accesstoken}`);
    var errObj = {status: 401, msg :'Unauthorized request'};
    if (accesstoken==null) {
      return JSON.stringify(errObj);
    }
   
    const qs = require('qs');
   
    var tokenvalue = accesstoken.substring(7);

    var errObj = {status: 401, msg :'Unauthorized request'};
    
    let data1 = qs.stringify({
      client_id: '<<client id for security verify>>',
      client_secret: '<<client secret for security verify>>',
      token: tokenvalue
    });

    const response = await fetch('<<security verify introspection url>>', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data1
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = (await response.json());

    if (result['active'] == true) {
      return this.service.weather(city);
    }
    return JSON.stringify(errObj);
  }
}
