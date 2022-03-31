"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = exports.SimpleWorker = void 0;
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const worker_manager_1 = require("./worker-manager");
const logger_1 = require("../logger");
const simple_worker_config_1 = require("../config/simple-worker.config");
const rxjs_1 = require("rxjs");
class SimpleWorker {
    constructor() {
        this.stopped = false;
    }
    get logger() {
        return this._logger.child('SimpleWorker');
    }
    stop() {
        this.stopped = true;
        this.logger.info('*** Stopping simple worker');
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.subject) {
            this.subject.complete();
        }
        return this.subject || (0, rxjs_1.of)();
    }
    start() {
        if (this.subject) {
            return this.subject;
        }
        this.subject = new rxjs_1.Subject();
        this.subject.next(this.writeLog());
        this.interval = setInterval(() => {
            this.subject.next(this.writeLog());
        }, this.config.runInterval);
        return this.subject;
    }
    writeLog() {
        const message = '**** Simple worker running';
        this.logger.info(message);
        return message;
    }
}
(0, tslib_1.__decorate)([
    typescript_ioc_1.Inject,
    (0, tslib_1.__metadata)("design:type", simple_worker_config_1.SimpleWorkerConfig)
], SimpleWorker.prototype, "config", void 0);
(0, tslib_1.__decorate)([
    typescript_ioc_1.Inject,
    (0, tslib_1.__metadata)("design:type", logger_1.LoggerApi)
], SimpleWorker.prototype, "_logger", void 0);
exports.SimpleWorker = SimpleWorker;
exports.worker = worker_manager_1.workerManager.registerWorker(typescript_ioc_1.Container.get(SimpleWorker));
