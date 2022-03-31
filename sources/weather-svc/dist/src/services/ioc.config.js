"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const hello_world_api_1 = require("./hello-world.api");
const hello_world_service_1 = require("./hello-world.service");
const weather_api_1 = require("./weather.api");
const weather_service_1 = require("./weather.service");
const config = [
    {
        bind: hello_world_api_1.HelloWorldApi,
        to: hello_world_service_1.HelloWorldService,
        scope: typescript_ioc_1.Scope.Singleton
    },
    {
        bind: weather_api_1.WeatherApi,
        to: weather_service_1.WeatherService,
        scope: typescript_ioc_1.Scope.Singleton
    }
];
exports.default = config;
