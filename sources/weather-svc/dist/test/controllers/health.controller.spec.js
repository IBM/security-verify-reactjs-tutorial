"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const helper_1 = require("../helper");
describe('health.controller', () => {
    let app;
    beforeEach(() => {
        const apiServer = (0, helper_1.buildApiServer)();
        app = apiServer.getApp();
    });
    test('canary validates test infrastructure', () => {
        expect(true).toBe(true);
    });
    describe('Given /health', () => {
        test('should return 200 status', () => {
            return (0, supertest_1.default)(app).get('/health').expect(200);
        });
        test('should return {status: "UP:}', () => {
            return (0, supertest_1.default)(app).get('/health').expect({ status: 'UP' });
        });
    });
});
