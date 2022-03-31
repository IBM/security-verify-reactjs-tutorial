"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./logger.api"), exports);
(0, tslib_1.__exportStar)(require("./logger-noop.service"), exports);
(0, tslib_1.__exportStar)(require("./logger-pino.service"), exports);
const typescript_ioc_1 = require("typescript-ioc");
const ioc_config_1 = (0, tslib_1.__importDefault)(require("./ioc.config"));
typescript_ioc_1.Container.configure(...ioc_config_1.default);
