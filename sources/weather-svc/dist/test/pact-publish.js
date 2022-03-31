"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = (0, tslib_1.__importStar)(require("path"));
const fs = (0, tslib_1.__importStar)(require("fs"));
const pact_node_1 = require("@pact-foundation/pact-node");
const config = (0, tslib_1.__importStar)(require("../package.json"));
const opts = config.pact;
const pactBroker = process.env.PACTBROKER_URL || opts.pactBrokerUrl;
function publishPact() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!pactBroker) {
            console.log('No pact broker configured...');
            return;
        }
        const pactFiles = yield listPactFiles(path.join(__dirname, '../pacts'));
        if (pactFiles.length == 0) {
            console.log('No pact files in pact directory: ' + path.join(__dirname, '../pacts'));
            return;
        }
        const options = {
            consumerVersion: config.version,
            pactBroker,
            pactFilesOrDirs: pactFiles,
        };
        console.log('Publishing pacts with options:', options);
        yield new pact_node_1.Publisher(options).publish();
        return;
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
                resolve(items.map(item => path.join(pactDir, item)));
            });
        });
    });
}
publishPact()
    .catch(err => {
    console.error('Error publishing pact', err);
    process.exit(1);
});
