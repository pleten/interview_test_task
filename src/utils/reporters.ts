import {SpecReporter} from "jasmine-spec-reporter";
// tslint:disable-next-line:no-var-requires
const HtmlReporter = require("protractor-beautiful-reporter");
// tslint:disable-next-line:no-var-requires
const JUnitXmlReporter = require("jasmine-reporters").JUnitXmlReporter;

export const initReporters = () => {
    jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
            displayStacktrace: true
        }
    }));

    jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: "tmp/html-report"
    }).getJasmine2Reporter());

    jasmine.getEnv().addReporter(new JUnitXmlReporter({
        savePath: "tmp/xml-report",
        filePrefix: "report"
    }));
};
