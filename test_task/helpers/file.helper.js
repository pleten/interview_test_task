const fs = require("fs");
const _ = require('lodash');
const path = require('path');

/**
 * File helper object.
 * @constructor
 */
const FileHelper = function () {
    /**
     * Save content in the file
     *
     */

    this.saveInFile = function (file, content) {
        const pathToFile = './data/savedFiles/' + file;
        fs.writeFile(pathToFile, content, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + file);
            }
        });
    };

    /**
     * Read the file
     *
     */

    this.readFile = function (file) {
        const pathToFile = './data/savedFiles/' + file;
        return JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
    };
};

module.exports = new FileHelper();
