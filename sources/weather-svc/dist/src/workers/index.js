"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const worker_manager_1 = require("./worker-manager");
(0, tslib_1.__exportStar)(require("./worker-manager"), exports);
(0, tslib_1.__exportStar)(require("./simple.worker"), exports);
typescript_ioc_1.Container.configure(...worker_manager_1.config);
