"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const workers_1 = require("../../src/workers");
const simple_worker_config_1 = require("../../src/config/simple-worker.config");
const logger_1 = require("../../src/logger");
describe('simple.worker', () => {
    test('canary verifies test infrastructure', () => {
        expect(true).toEqual(true);
    });
    describe('given SimpleWorker', () => {
        let worker;
        let writeLogMock;
        beforeEach(() => {
            typescript_ioc_1.Container
                .bind(simple_worker_config_1.SimpleWorkerConfig)
                .factory(() => ({ runInterval: 500 }));
            typescript_ioc_1.Container
                .bind(logger_1.LoggerApi)
                .to(logger_1.NoopLoggerService);
            worker = typescript_ioc_1.Container.get(workers_1.SimpleWorker);
            writeLogMock = worker.writeLog = jest.fn();
        });
        afterEach(() => {
            return worker.stop();
        });
        context('when started', () => {
            test('then run until stopped', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                const observable = worker.start();
                yield promiseTimeout(() => { return; }, 600);
                yield worker.stop().toPromise();
                yield observable.toPromise();
                expect(writeLogMock).toHaveBeenCalledTimes(2);
            }));
            context('and when start() called again', () => {
                test('then should return same observable', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    const observable = worker.start();
                    expect(worker.start()).toBe(observable);
                    yield worker.stop().toPromise();
                }));
            });
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
