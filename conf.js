require("@babel/register")({
    presets: [ '@babel/preset-env' ]
});
var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');
exports.config = {
    /**
     *  Uncomment ONE of the following to connect to: seleniumServerJar OR directConnect. Protractor
     *  will auto-start selenium if you uncomment the jar, or connect directly to chrome/firefox
     *  if you uncomment directConnect.
     */
    //seleniumServerJar: "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar",
    directConnect: true,
    baseUrl: 'https://www.ssls.com/',
    specs: ['specs/*Spec.js'],
    framework: 'jasmine',
    onPrepare: () => {
      // set browser size...
      browser.manage().window().maximize();
      // better jasmine 2 reports...
      const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'specs'}));
      //HTML Reports
      jasmine.getEnv().addReporter(new HtmlReporter({
            preserveDirectory: false,
            takeScreenShotsOnlyForFailedSpecs: true,
            baseDirectory: 'reports',
            jsonsSubfolder: 'jsons',
            screenshotsSubfolder: 'images',
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                var currentDate = new Date(),
                    day = currentDate.getDate(),
                    month = currentDate.getMonth() + 1,
                    year = currentDate.getFullYear();

                return path.join(
                    day + "-" + month + "-" + year,
                    capabilities.get('browserName'),
                    descriptions.join('-')
                    );
            }
      }).getJasmine2Reporter());
  },

  capabilities: {
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 2,
      chromeOptions: {
          args: [
              // disable chrome's wakiness
              '--disable-infobars',
              '--disable-extensions',
              'verbose',
              'log-path=/tmp/chromedriver.log'
          ],
          prefs: {
              // disable chrome's password manager
              'profile.password_manager_enabled': false,
              'credentials_enable_service': false,
              'password_manager_enabled': false
          }
      }
  },

  jasmineNodeOpts: {
      showColors: true,
      displaySpecDuration: true,
      // overrides jasmine's print method to report dot syntax for custom reports
      print: () => {},
      defaultTimeoutInterval: 50000
  }
};