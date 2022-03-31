"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const tracer_api_1 = require("./tracer.api");
const jaeger_tracer_factory_1 = (0, tslib_1.__importDefault)(require("./jaeger-tracer.factory"));
const config = [
    {
        bind: tracer_api_1.TracerApi,
        factory: jaeger_tracer_factory_1.default
    }
];
exports.default = config;
