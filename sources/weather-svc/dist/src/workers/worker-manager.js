"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerManager = exports.config = exports.WorkerManager = void 0;
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const logger_1 = require("../logger");
const rxjs_1 = require("rxjs");
class WorkerManager {
}
exports.WorkerManager = WorkerManager;
class WorkerManagerImpl {
    constructor() {
        this.workers = [];
    }
    get logger() {
        return this._logger.child('WorkerManagerImpl');
    }
    registerWorker(worker) {
        if (worker) {
            this.workers.push(worker);
        }
        return worker;
    }
    workerCount() {
        return this.workers.length;
    }
    start() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info('starting workers');
            const observables = this.workers.map(worker => worker.start());
            return (0, rxjs_1.forkJoin)(observables).toPromise().then(result => 'done');
        });
    }
    stop() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.logger.info('stopping workers');
            const observables = this.workers.map(worker => worker.stop());
            return (0, rxjs_1.forkJoin)(observables).toPromise().then(result => 'stopped');
        });
    }
}
(0, tslib_1.__decorate)([
    typescript_ioc_1.Inject,
    (0, tslib_1.__metadata)("design:type", logger_1.LoggerApi)
], WorkerManagerImpl.prototype, "_logger", void 0);
exports.config = [
    {
        bind: WorkerManager,
        to: WorkerManagerImpl,
    }
];
exports.workerManager = typescript_ioc_1.Container.get(WorkerManagerImpl);
