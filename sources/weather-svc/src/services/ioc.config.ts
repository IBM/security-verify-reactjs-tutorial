import {ContainerConfiguration, Scope} from 'typescript-ioc';
import {HelloWorldApi} from './hello-world.api';
import {HelloWorldService} from './hello-world.service';
import {WeatherApi} from './weather.api';
import {WeatherService} from './weather.service';

const config: ContainerConfiguration[] = [
  {
    bind: HelloWorldApi,
    to: HelloWorldService,
    scope: Scope.Singleton
  },
  {
    bind: WeatherApi,
    to: WeatherService,
    scope: Scope.Singleton
  }
];

export default config;