import { cucumberReporterOptions, jsonReports, htmlReports } from "../support";
const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const mkdirp = require('mkdirp');


export class Reporter {
    static createDirectory() {
        if (!fs.existsSync(jsonReports)) {
            mkdirp.sync(jsonReports);
        }
    }

    static deleteDirectory() {
        if (fs.existsSync(jsonReports)) {
            var files = fs.readdirSync(jsonReports)
            for (var i in files) {
                if (fs.lstatSync(jsonReports + '\\' + files[i]).isFile()) {
                    fs.unlinkSync(jsonReports + '\\' + files[i]);
                    console.log(jsonReports + '\\' + files[i] + ' was deleted');
                }
            }
        }
    }

    static createHTMLReport() {
        try {
            if (!fs.existsSync(htmlReports)) {
                mkdirp.sync(htmlReports);
            }
            reporter.generate(cucumberReporterOptions);
        } catch (err) {
            if (err) {
                throw new Error('Failed to save cucumber test results to json file.');
            }
        }
    }
}
