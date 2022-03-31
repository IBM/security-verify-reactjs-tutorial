"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApiServer = void 0;
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const server_1 = require("../src/server");
const logger_1 = require("../src/logger");
const noop_tracer_factory_1 = (0, tslib_1.__importDefault)(require("../src/tracer/noop-tracer.factory"));
const tracer_1 = require("../src/tracer");
function buildApiServer(enableLogging) {
    const apiServer = new server_1.ApiServer();
    if (!enableLogging) {
        typescript_ioc_1.Container.bind(logger_1.LoggerApi).to(logger_1.NoopLoggerService);
    }
    typescript_ioc_1.Container.bind(tracer_1.TracerApi).factory(noop_tracer_factory_1.default);
    return apiServer;
}
exports.buildApiServer = buildApiServer;
