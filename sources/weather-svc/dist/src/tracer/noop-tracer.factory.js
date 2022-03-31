"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opentracing_1 = require("opentracing");
let tracer;
function initTracer() {
    const tracer = new opentracing_1.Tracer();
    (0, opentracing_1.initGlobalTracer)(tracer);
    return tracer;
}
const noopTracerFactory = () => {
    if (!tracer) {
        tracer = initTracer();
    }
    return tracer;
};
exports.default = noopTracerFactory;
