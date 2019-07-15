// Reportingoptions
const htmlReports = process.cwd() + '\\reports\\html';
const jsonReports = process.cwd() + '\\reports\\json';

const cucumberReporterOptions = {
    //jsonFile: targetJson,
    jsonDir: jsonReports,
    ignoreBadJsonFile: true,
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
    brandTitle: 'SSL application'
};

module.exports = {
    htmlReports,
    jsonReports,
    cucumberReporterOptions
}