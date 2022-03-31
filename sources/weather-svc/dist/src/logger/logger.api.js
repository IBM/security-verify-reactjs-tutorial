"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerApi = void 0;
// tslint:disable
class LoggerApi {
    time(action, startTime) {
        const time = Date.now() - startTime;
        this.info(`TIMER: ${action} completed in ${time} milliseconds`, {
            duration: time,
            action: action,
            type: 'TIMER',
        });
    }
}
exports.LoggerApi = LoggerApi;
