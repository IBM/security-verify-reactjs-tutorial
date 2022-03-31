"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const workers_1 = require("../../src/workers");
const logger_1 = require("../../src/logger");
describe('worker-manager', () => {
    test('canary verifies test infrastructure', () => {
        expect(true).toEqual(true);
    });
    describe('given WorkerManagerImpl', () => {
        let classUnderTest;
        let mockWorkerApi;
        beforeEach(() => {
            typescript_ioc_1.Container.bind(logger_1.LoggerApi).to(logger_1.NoopLoggerService);
            classUnderTest = typescript_ioc_1.Container.get(workers_1.WorkerManager);
            mockWorkerApi = {
                start: jest.fn(),
                stop: jest.fn()
            };
        });
        describe('given registerWorker()', () => {
            test('when called with defined worker then increase worker count', () => {
                classUnderTest.registerWorker(mockWorkerApi);
                expect(classUnderTest.workerCount()).toEqual(1);
            });
            test('when worker is undefined then do not increment worker count', () => {
                classUnderTest.registerWorker(undefined);
                expect(classUnderTest.workerCount()).toEqual(0);
            });
        });
        describe('given start()', () => {
            beforeEach(() => {
                classUnderTest.registerWorker(mockWorkerApi);
                mockWorkerApi.start.mockResolvedValue('test');
            });
            test('when called then call WorkerApi start', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                yield classUnderTest.start();
                expect(mockWorkerApi.start).toHaveBeenCalled();
            }));
        });
        describe('given stop()', () => {
            beforeEach(() => {
                classUnderTest.registerWorker(mockWorkerApi);
                mockWorkerApi.stop.mockResolvedValue('test');
            });
            test('when called then call WorkerApi stop', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                yield classUnderTest.stop();
                expect(mockWorkerApi.stop).toHaveBeenCalled();
            }));
        });
    });
});
