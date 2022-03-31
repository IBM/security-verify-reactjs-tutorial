"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_worker_config_1 = require("../src/config/simple-worker.config");
describe('simple-worker.config', () => {
    test('canary verifies test infrastructure', () => {
        expect(true).toEqual(true);
    });
    describe('given SimpleWorkerConfig', () => {
        test('default runInterval should be 60,000 microseconds', () => {
            expect(new simple_worker_config_1.SimpleWorkerConfig().runInterval).toEqual(60000);
        });
    });
});
