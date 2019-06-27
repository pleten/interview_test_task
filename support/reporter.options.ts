// Reportingoptions
export const htmlReports = process.cwd() + '\\reports\\html';
export const jsonReports = process.cwd() + '\\reports\\json';

export const cucumberReporterOptions = {
    //jsonFile: targetJson,
    jsonDir: jsonReports,
    ignoreBadJsonFile: true,
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
    brandTitle: 'SSL application'
};