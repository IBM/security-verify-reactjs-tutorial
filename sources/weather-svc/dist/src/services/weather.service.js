"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const logger_1 = require("../logger");
const node_fetch_1 = (0, tslib_1.__importDefault)(require("node-fetch"));
let WeatherService = class WeatherService {
    constructor(logger) {
        this.logger = logger.child('Weather Service');
    }
    weather(city = 'New York') {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`Getting weather for ${city}`);
            const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=68c6b9ec6119ec653a31bb81bc7a42ff';
            const response = yield (0, node_fetch_1.default)(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = (yield response.json());
            return result;
        });
    }
};
WeatherService = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, typescript_ioc_1.Inject),
    (0, tslib_1.__metadata)("design:paramtypes", [logger_1.LoggerApi])
], WeatherService);
exports.WeatherService = WeatherService;
