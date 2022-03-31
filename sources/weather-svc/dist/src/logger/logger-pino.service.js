"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoLoggerService = void 0;
const tslib_1 = require("tslib");
const pino_1 = (0, tslib_1.__importDefault)(require("pino"));
const express_pino_logger_1 = (0, tslib_1.__importDefault)(require("express-pino-logger"));
const logger_api_1 = require("./logger.api");
const cls_hooked_1 = require("cls-hooked");
const trace_constants_1 = require("../util/opentracing/trace-constants");
// tslint:disable
class ChildLogger extends logger_api_1.LoggerApi {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    error(message, context) {
        if (context) {
            this.logger.error(context, message);
        }
        else {
            this.logger.error(message);
        }
    }
    log(message, context) {
        if (context) {
            this.logger.info(context, message);
        }
        else {
            this.logger.info(message);
        }
    }
    debug(message, context) {
        if (context) {
            this.logger.debug(context, message);
        }
        else {
            this.logger.debug(message);
        }
    }
    info(message, context) {
        if (context) {
            this.logger.info(context, message);
        }
        else {
            this.logger.info(message);
        }
    }
    warn(message, context) {
        if (context) {
            this.logger.warn(context, message);
        }
        else {
            this.logger.warn(message);
        }
    }
    fatal(message, context) {
        if (context) {
            this.logger.fatal(context, message);
        }
        else {
            this.logger.fatal(message);
        }
    }
    trace(message, context) {
        if (context) {
            this.logger.trace(context, message);
        }
        else {
            this.logger.trace(message);
        }
    }
    child(component) {
        const clsNamespace = (0, cls_hooked_1.getNamespace)(trace_constants_1.TraceConstants.NAMESPACE);
        const traceContext = clsNamespace ? clsNamespace.get(trace_constants_1.TraceConstants.TRACE_CONTEXT) : {};
        return new ChildLogger(this.logger.child(Object.assign({ component }, traceContext)));
    }
    apply(app) {
        app.use((0, express_pino_logger_1.default)());
    }
}
class PinoLoggerService extends ChildLogger {
    constructor() {
        super(PinoLoggerService.buildLogger());
    }
    static buildLogger() {
        return (0, pino_1.default)();
    }
}
exports.PinoLoggerService = PinoLoggerService;
