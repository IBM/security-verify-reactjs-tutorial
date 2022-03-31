"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = require("../../src/logger");
class MockLogger extends logger_1.LoggerApi {
    constructor() {
        super(...arguments);
        this.log = jest.fn();
        this.info = jest.fn();
        this.debug = jest.fn();
        this.fatal = jest.fn();
        this.warn = jest.fn();
        this.error = jest.fn();
        this.trace = jest.fn();
        this.child = jest.fn();
        this.apply = jest.fn();
    }
}
describe('logger.api', () => {
    test('canary verifies test infrastructure', () => {
        expect(true).toEqual(true);
    });
    describe('given LoggerApi.time()', () => {
        context('when called', () => {
            test('then pass time data to info', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                const start = Date.now();
                const action = 'action';
                const duration = 500;
                yield promiseTimeout(() => { return; }, duration);
                const logger = new MockLogger();
                logger.time(action, start);
                expect(logger.info.mock.calls[0][1].action).toEqual(action);
                expect(logger.info.mock.calls[0][1].duration).toBeGreaterThanOrEqual(duration);
            }));
        });
    });
});
function promiseTimeout(fn, timeout) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn());
            }, timeout);
        });
    });
}
