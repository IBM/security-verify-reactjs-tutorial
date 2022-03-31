"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const tslib_1 = require("tslib");
const typescript_rest_1 = require("typescript-rest");
let HealthController = class HealthController {
    healthCheck() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return {
                status: 'UP'
            };
        });
    }
};
(0, tslib_1.__decorate)([
    typescript_rest_1.GET,
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], HealthController.prototype, "healthCheck", null);
HealthController = (0, tslib_1.__decorate)([
    (0, typescript_rest_1.Path)('/health')
], HealthController);
exports.HealthController = HealthController;
