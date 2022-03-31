"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const tslib_1 = require("tslib");
const server_1 = require("./server");
const workers_1 = require("./workers");
const start = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const apiServer = new server_1.ApiServer();
        Promise.all([
            apiServer.start(),
            workers_1.workerManager.start(),
        ]).then(() => resolve())
            .catch(reject);
        const graceful = () => {
            Promise.all([
                apiServer.stop(),
                workers_1.workerManager.stop(),
            ]).then(() => process.exit(0));
        };
        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
});
exports.start = start;
