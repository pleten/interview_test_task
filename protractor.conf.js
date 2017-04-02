exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/**/*.spec.js'],
  baseUrl: 'https://www.ssls.com',
  restartBrowserBetweenTests: true,
  multiCapabilities: [
    {
      browserName: 'chrome'
    }
  ],
  jasmineNodeOpts: {
    showColors: true,
    print: function() {}
  },
  onPrepare: Prepare
};

function Prepare() {
  var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
  var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

  jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));
  jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
    savePath: './reports/',
    screenshotsFolder: 'images',
    takeScreenshotsOnlyOnFailures: true
  }));

  Array.prototype.takeRandom = function(){
    var index = Math.round(Math.random() * (this.length - 1));

    return this[index];
  };

  browser.driver.manage().window().maximize();
}