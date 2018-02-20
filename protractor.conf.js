// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 40000,
  getPageTimeout: 40000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['no-sandbox', 'disable-infobars', 'headless']
    },
  },
  directConnect: true,
  baseUrl: 'https://www.ssls.com',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  // according to deprecation plan: https://github.com/SeleniumHQ/selenium/issues/2969
  // controlFlow will be removed in october 2018
  // in fact it is already removed in 4.0.0-alpha: https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/CHANGES.md
  // so let's turn it off
  SELENIUM_PROMISE_MANAGER: false, 
  onPrepare() {
    require('ts-node').register({
      project: 'tsconfig.json'
    });

    browser.driver.manage().window().setSize(1920, 1080);

    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
