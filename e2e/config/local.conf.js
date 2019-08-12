"use strict";

const config = require('./shared.conf'); 

config.capabilities = {
    browserName: "chrome",
    chromeOptions: {
        args: ["disable-extensions", "start-maximized"], //, "--headless", "--disable-gpu"
    }
};

config.allScriptsTimeout = 60000;
config.jasmineNodeOpts.defaultTimeoutInterval = 60000;

config.specs = [
    "../specs/authorization/*.spec.js",
    "../specs/logout/*.spec.js",
    "../specs/myProfile/*.spec.js",
    "../specs/home/*.spec.js"
];

config.exclude = [];

exports.config = config;
