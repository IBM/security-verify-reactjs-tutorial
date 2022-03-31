"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_ioc_1 = require("typescript-ioc");
const jaeger_client_1 = require("jaeger-client");
const opentracing_1 = require("opentracing");
const logger_1 = require("../logger");
const packageConfig = require('../../package.json');
let tracer;
function initTracer() {
    const tags = {};
    tags[`${packageConfig.name}.version`] = packageConfig.version;
    const logger = typescript_ioc_1.Container.get(logger_1.LoggerApi);
    const config = {
        serviceName: packageConfig.name,
        reporter: {
            logSpans: true
        }
    };
    const options = {
        tags,
        logger,
    };
    tracer = (0, jaeger_client_1.initTracerFromEnv)(config, options);
    const codec = new jaeger_client_1.ZipkinB3TextMapCodec({ urlEncoding: true });
    tracer.registerInjector(opentracing_1.FORMAT_HTTP_HEADERS, codec);
    tracer.registerExtractor(opentracing_1.FORMAT_HTTP_HEADERS, codec);
    (0, opentracing_1.initGlobalTracer)(tracer);
    return tracer;
}
const jaegerTracerFactory = () => {
    if (!tracer) {
        tracer = initTracer();
    }
    return tracer;
};
exports.default = jaegerTracerFactory;
