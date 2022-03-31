"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServer = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const typescript_rest_1 = require("typescript-rest");
const typescript_ioc_1 = require("typescript-ioc");
const npmPackage = (0, tslib_1.__importStar)(require("../package.json"));
const string_util_1 = require("./util/string-util");
const logger_1 = require("./logger");
const tracer_1 = require("./tracer");
const express_middleware_1 = require("./util/opentracing/express-middleware");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const config = npmPackage.config || {
    protocol: 'http',
    host: 'localhost',
    port: 3000,
    'context-root': '/'
};
const configApiContext = config['context-root'];
class ApiServer {
    constructor(app = (0, express_1.default)(), apiContext = configApiContext) {
        this.app = app;
        // private readonly app: express.Application;
        this.server = null;
        this.PORT = +process.env.PORT || npmPackage.config.port;
        this.app.use((0, express_middleware_1.opentracingMiddleware)({ tracer: this.tracer }));
        this.logger.apply(this.app);
        this.app.use(cors());
        if (!apiContext || apiContext === '/') {
            this.app.use(express_1.default.static(path.join(process.cwd(), 'public'), { maxAge: 31557600000 }));
        }
        else {
            this.app.use(apiContext, express_1.default.static(path.join(process.cwd(), 'public'), { maxAge: 31557600000 }));
        }
        const apiRouter = express_1.default.Router();
        typescript_rest_1.Server.loadServices(apiRouter, [
            'controllers/*',
        ], __dirname);
        const swaggerPath = path.join(process.cwd(), 'dist/swagger.json');
        if (fs.existsSync(swaggerPath)) {
            typescript_rest_1.Server.swagger(apiRouter, {
                filePath: swaggerPath,
                schemes: this.swaggerProtocols,
                host: this.swaggerHost,
                endpoint: '/api-docs'
            });
        }
        if (!apiContext || apiContext === '/') {
            this.app.use(apiRouter);
        }
        else {
            this.app.use(apiContext, apiRouter);
        }
    }
    /**
     * Start the server
     * @returns {Promise<any>}
     */
    start() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.server = this.app.listen(this.PORT, () => {
                    const addressInfo = this.server.address();
                    const address = addressInfo.address === '::' ? 'localhost' : addressInfo.address;
                    // tslint:disable-next-line:no-console
                    console.log(`Listening to http://${address}:${addressInfo.port}`);
                    return resolve(this);
                });
            });
        });
    }
    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    stop() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                if (this.server) {
                    this.server.close(() => {
                        return resolve(true);
                    });
                }
                else {
                    return resolve(false);
                }
            });
        });
    }
    getApp() {
        return this.app;
    }
    get swaggerProtocols() {
        return (0, string_util_1.parseCsvString)(process.env.PROTOCOLS, '');
    }
    get swaggerHost() {
        return process.env.INGRESS_HOST || '';
    }
}
(0, tslib_1.__decorate)([
    typescript_ioc_1.Inject,
    (0, tslib_1.__metadata)("design:type", logger_1.LoggerApi)
], ApiServer.prototype, "logger", void 0);
(0, tslib_1.__decorate)([
    typescript_ioc_1.Inject,
    (0, tslib_1.__metadata)("design:type", tracer_1.TracerApi)
], ApiServer.prototype, "tracer", void 0);
exports.ApiServer = ApiServer;
