"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
(0, tslib_1.__exportStar)(require("./tracer.api"), exports);
const ioc_config_1 = (0, tslib_1.__importDefault)(require("./ioc.config"));
typescript_ioc_1.Container.configure(...ioc_config_1.default);
