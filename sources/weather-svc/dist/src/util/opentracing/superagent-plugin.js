"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opentracingPlugin = void 0;
const opentracing_1 = require("opentracing");
const guards_1 = require("./guards");
const cls_hooked_1 = require("cls-hooked");
const trace_constants_1 = require("./trace-constants");
/*
 This component provides a plugin to inject the opentracing headers into a superagent request

 Usage:
   superagent.get(url).use(opentracingPlugin(span));
 */
function opentracingPlugin({ tracer = (0, opentracing_1.globalTracer)(), span } = {}) {
    const clsNamespace = (0, cls_hooked_1.getNamespace)(trace_constants_1.TraceConstants.NAMESPACE);
    const childOf = span || clsNamespace ? clsNamespace.get(trace_constants_1.TraceConstants.SPAN) : undefined;
    const requestSpan = tracer.startSpan('http_request', (0, guards_1.isSpan)(childOf) ? { childOf } : {});
    return (req) => {
        requestSpan.setTag(opentracing_1.Tags.HTTP_URL, req.url);
        requestSpan.setTag(opentracing_1.Tags.HTTP_METHOD, req.method);
        const headers = {};
        tracer.inject(requestSpan, opentracing_1.FORMAT_HTTP_HEADERS, headers);
        req.set(headers);
        req.on('error', (error) => {
            requestSpan.setTag(opentracing_1.Tags.ERROR, true);
            requestSpan.setTag(opentracing_1.Tags.HTTP_STATUS_CODE, error.status);
            requestSpan.log({
                event: 'error',
                message: error.message,
                err: error,
            });
        });
        req.on('response', (res) => {
            requestSpan.setTag(opentracing_1.Tags.HTTP_STATUS_CODE, res.status);
        });
        req.on('end', () => {
            requestSpan.finish();
        });
    };
}
exports.opentracingPlugin = opentracingPlugin;
