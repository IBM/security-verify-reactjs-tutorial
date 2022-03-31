import { Container } from "typescript-ioc";

export * from './hello-world.api';
export * from './hello-world.service';
export * from './weather.api';
export * from './weather.service';

import config from './ioc.config';

Container.configure(...config);