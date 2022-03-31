"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
(0, start_1.start)()
    .catch((err) => {
    console.error(`Error starting server: ${err.message}`, err);
    process.exit(-1);
});
