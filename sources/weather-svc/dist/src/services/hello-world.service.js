"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldService = void 0;
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const logger_1 = require("../logger");
let HelloWorldService = class HelloWorldService {
    constructor(logger) {
        this.logger = logger.child('HelloWorldService');
    }
    greeting(name = 'World') {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info(`Generating greeting for ${name}`);
            return `Hello, ${name}!`;
        });
    }
};
HelloWorldService = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, typescript_ioc_1.Inject),
    (0, tslib_1.__metadata)("design:paramtypes", [logger_1.LoggerApi])
], HelloWorldService);
exports.HelloWorldService = HelloWorldService;
