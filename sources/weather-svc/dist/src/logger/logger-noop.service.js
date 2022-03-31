"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopLoggerService = void 0;
const logger_api_1 = require("./logger.api");
// tslint:disable
class NoopLoggerService extends logger_api_1.LoggerApi {
    log(message, context) { }
    info(message, context) { }
    debug(message, context) { }
    fatal(message, context) { }
    warn(message, context) { }
    error(message, context) { }
    trace(message, context) { }
    child(childName) {
        return this;
    }
    apply(app) {
    }
}
exports.NoopLoggerService = NoopLoggerService;
