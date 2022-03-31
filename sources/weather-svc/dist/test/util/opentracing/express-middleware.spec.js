"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_middleware_1 = require("../../../src/util/opentracing/express-middleware");
describe('express-middelware', () => {
    test('canary verifies test infrastructure', () => {
        expect(true).toEqual(true);
    });
    describe('given buildTraceContext()', () => {
        describe('when context is undefined', () => {
            test('then return empty object', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                expect((0, express_middleware_1.buildTraceContext)(undefined)).toEqual({});
            }));
        });
        describe('when context does not contain uber-trace-id', () => {
            test('then return context', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                const context = { test: 'value' };
                expect((0, express_middleware_1.buildTraceContext)(context)).toEqual(context);
            }));
        });
        describe('when context contains uber-trace-id', () => {
            test('then return {traceId, spanId, parentSpanId, flags}', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                const traceId = 'traceid';
                const spanId = 'spanid';
                const parentSpanId = '0';
                const flags = '0';
                const context = { 'uber-trace-id': `${traceId}:${spanId}:${parentSpanId}:${flags}` };
                expect((0, express_middleware_1.buildTraceContext)(context)).toEqual({ traceId, spanId, parentSpanId, flags });
            }));
        });
    });
});
