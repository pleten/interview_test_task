"use strict";
const conf = require("./shared.config");

exports.config = Object.assign(conf.sharedConfig, {
    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["--window-size=1920x1080"]
        },
        maxInstances: 1,
        shardTestFiles: true, // set to to if you want to execute Tescases in paralell
    },
    directConnect: true,
});
