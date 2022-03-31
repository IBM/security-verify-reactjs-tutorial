"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const logger_api_1 = require("./logger.api");
const logger_pino_service_1 = require("./logger-pino.service");
const config = [
    {
        bind: logger_api_1.LoggerApi,
        to: logger_pino_service_1.PinoLoggerService,
        scope: typescript_ioc_1.Scope.Singleton
    }
];
exports.default = config;
