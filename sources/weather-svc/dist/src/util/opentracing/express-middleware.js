"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opentracingMiddleware = exports.buildTraceContext = void 0;
const tslib_1 = require("tslib");
const opentracing_1 = require("opentracing");
const cls_hooked_1 = require("cls-hooked");
const url = (0, tslib_1.__importStar)(require("url"));
const trace_constants_1 = require("./trace-constants");
const object_1 = require("../object");
const clsNamespace = (0, cls_hooked_1.createNamespace)(trace_constants_1.TraceConstants.NAMESPACE);
const buildTraceContext = (context) => {
    if (!context) {
        return {};
    }
    if (context['uber-trace-id']) {
        const uberTraceId = context['uber-trace-id'];
        const values = uberTraceId.split(':');
        if (values.length < 4) {
            return context;
        }
        const traceId = values[0];
        const spanId = values[1];
        const parentSpanId = values[2];
        const flags = values[3];
        return Object.assign({}, (0, object_1.omit)(context, 'uber-trace-id'), { traceId, spanId, parentSpanId, flags });
    }
    return context;
};
exports.buildTraceContext = buildTraceContext;
function opentracingMiddleware({ tracer = (0, opentracing_1.globalTracer)() } = {}) {
    return (req, res, next) => {
        clsNamespace.bindEmitter(req);
        clsNamespace.bindEmitter(res);
        const wireCtx = tracer.extract(opentracing_1.FORMAT_HTTP_HEADERS, req.headers);
        const pathname = url.parse(req.url).pathname;
        const span = tracer.startSpan(pathname, { childOf: wireCtx });
        span.logEvent("request_received", {});
        const headers = {};
        tracer.inject(span, opentracing_1.FORMAT_HTTP_HEADERS, headers);
        // include some useful tags on the trace
        span.setTag(opentracing_1.Tags.HTTP_METHOD, req.method);
        span.setTag(opentracing_1.Tags.SPAN_KIND, "server");
        span.setTag(opentracing_1.Tags.HTTP_URL, req.url);
        // include trace ID in headers so that we can debug slow requests we see in
        // the browser by looking up the trace ID found in response headers
        const responseHeaders = {};
        tracer.inject(span, opentracing_1.FORMAT_TEXT_MAP, responseHeaders);
        Object.keys(responseHeaders).forEach(key => res.setHeader(key, responseHeaders[key]));
        // add the span to the request object for handlers to use
        Object.assign(req, { span });
        // finalize the span when the response is completed
        const finishSpan = () => {
            span.logEvent("request_finished", {});
            // Route matching often happens after the middleware is run. Try changing the operation name
            // to the route matcher.
            const opName = (req.route && req.route.path) || pathname;
            span.setOperationName(opName);
            span.setTag("http.status_code", res.statusCode);
            if (res.statusCode >= 500) {
                span.setTag(opentracing_1.Tags.ERROR, true);
                span.setTag(opentracing_1.Tags.SAMPLING_PRIORITY, 1);
            }
            span.finish();
        };
        // res.on('close', finishSpan);
        res.on('finish', finishSpan);
        clsNamespace.run(() => {
            clsNamespace.set(trace_constants_1.TraceConstants.TRACE_CONTEXT, (0, exports.buildTraceContext)(responseHeaders));
            clsNamespace.set(trace_constants_1.TraceConstants.SPAN, span);
            next();
        });
    };
}
exports.opentracingMiddleware = opentracingMiddleware;
