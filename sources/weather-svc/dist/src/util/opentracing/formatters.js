"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fatalEvent = exports.warnEvent = exports.traceEvent = exports.infoEvent = exports.debugEvent = exports.responseEvent = exports.startEvent = exports.errorEvent = exports.traceResponse = exports.traceStart = exports.traceError = void 0;
const opentracing_1 = require("opentracing");
function traceError(span, error, reThrow, message, context) {
    span.setTag(opentracing_1.Tags.ERROR, true);
    span.log(errorEvent(message, context, error));
    if (reThrow) {
        throw error;
    }
}
exports.traceError = traceError;
function traceStart(span, context) {
    span.log(startEvent('Start', context));
}
exports.traceStart = traceStart;
function traceResponse(span, context) {
    span.log(responseEvent('Response', context));
}
exports.traceResponse = traceResponse;
function errorEvent(message, context, error) {
    return buildMessage('error', message, context, error);
}
exports.errorEvent = errorEvent;
function startEvent(message, context) {
    return buildMessage('start', message, context);
}
exports.startEvent = startEvent;
function responseEvent(message, context) {
    return buildMessage('response', message, context);
}
exports.responseEvent = responseEvent;
function debugEvent(message, context) {
    return buildMessage('debug', message, context);
}
exports.debugEvent = debugEvent;
function infoEvent(message, context) {
    return buildMessage('info', message, context);
}
exports.infoEvent = infoEvent;
function traceEvent(message, context) {
    return buildMessage('trace', message, context);
}
exports.traceEvent = traceEvent;
function warnEvent(message, context, error) {
    return buildMessage('warn', message, context, error);
}
exports.warnEvent = warnEvent;
function fatalEvent(message, context, error) {
    return buildMessage('fatal', message, context, error);
}
exports.fatalEvent = fatalEvent;
function buildMessage(event, message, context, error) {
    if (error) {
        return Object.assign({ event, 'error.object': error, message: message || error.message, stack: error.stack }, context || {});
    }
    else {
        return Object.assign({ event, message }, context || {});
    }
}
