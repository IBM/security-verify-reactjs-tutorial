"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const tslib_1 = require("tslib");
const typescript_rest_1 = require("typescript-rest");
const typescript_ioc_1 = require("typescript-ioc");
const services_1 = require("../services");
const logger_1 = require("../logger");
let WeatherController = class WeatherController {
    get logger() {
        return this._baseLogger.child('WeatherController');
    }
    sayHello(city) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`Getting weather for ${city}`);
            return this.service.weather(city);
        });
    }
};
(0, tslib_1.__decorate)([
    typescript_ioc_1.Inject,
    (0, tslib_1.__metadata)("design:type", services_1.WeatherApi)
], WeatherController.prototype, "service", void 0);
(0, tslib_1.__decorate)([
    typescript_ioc_1.Inject,
    (0, tslib_1.__metadata)("design:type", logger_1.LoggerApi)
], WeatherController.prototype, "_baseLogger", void 0);
(0, tslib_1.__decorate)([
    (0, typescript_rest_1.Path)(':city'),
    typescript_rest_1.GET,
    (0, tslib_1.__param)(0, (0, typescript_rest_1.PathParam)('city')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WeatherController.prototype, "sayHello", null);
WeatherController = (0, tslib_1.__decorate)([
    (0, typescript_rest_1.Path)('/weather')
], WeatherController);
exports.WeatherController = WeatherController;
