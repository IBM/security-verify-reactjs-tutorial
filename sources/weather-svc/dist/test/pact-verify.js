"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = (0, tslib_1.__importStar)(require("path"));
const fs = require("fs");
const pact_1 = require("@pact-foundation/pact");
const yargs = (0, tslib_1.__importStar)(require("yargs"));
const helper_1 = require("./helper");
const config = (0, tslib_1.__importStar)(require("../package.json"));
const superagent = require("superagent");
const provider = config.config;
const opts = config.pact;
const argv = yargs.options({
    providerBaseUrl: {
        alias: 'p',
        default: `${provider.protocol}://${provider.host}:${provider.port}${provider.contextRoot}`
    }
}).argv;
const pactBrokerUrl = process.env.PACTBROKER_URL || opts.pactBrokerUrl;
function buildOptions() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const pactUrls = yield listPactFiles(path.join(process.cwd(), 'pacts'));
        if (!pactBrokerUrl && pactUrls.length === 0) {
            console.log('Nothing to test. Pact Broker url not set and no pact files found');
            return undefined;
        }
        const options = Object.assign({}, opts, argv, pactBrokerUrl
            ? { pactBrokerUrl }
            : { pactUrls }, {
            provider: config.name,
            providerVersion: config.version,
            publishVerificationResult: true,
        });
        console.log('Pact verification options', options);
        return options;
    });
}
function listPactFiles(pactDir) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(pactDir)) {
                resolve([]);
                return;
            }
            fs.readdir(pactDir, (err, items) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!items || items.length == 0) {
                    reject(new Error('no pact files found'));
                    return;
                }
                resolve(items.map(item => path.join(pactDir, item)));
            });
        });
    });
}
function verifyPact() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const options = yield buildOptions().catch(err => {
            console.log('Error building pact options: ' + err.message);
            return null;
        });
        if (!options) {
            return;
        }
        if (options.pactBrokerUrl) {
            const url = `${options.pactBrokerUrl}/pacts/provider/${options.provider}/latest`;
            try {
                yield superagent.get(url);
            }
            catch (err) {
                if (err.status === 404) {
                    console.log('No pacts found for provider in pact broker: ' + options.provider);
                    return;
                }
            }
        }
        console.log('Starting server');
        const server = yield (0, helper_1.buildApiServer)().start();
        try {
            yield new pact_1.Verifier(options).verifyProvider();
        }
        finally {
            yield server.stop();
        }
    });
}
verifyPact().catch(err => {
    console.log('Error verifying provider', err);
    process.exit(1);
});
