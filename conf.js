exports.config = {
  
  framework: 'jasmine2',

  onPrepare: function () {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter());
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  },


  // beforeLaunch: function() {
  //   return new Promise(function(resolve){
  //     htmlScreenshoReporter.beforeLaunch(resolve);
  //   });
  // },
  //
  // onPrepare: function () {
  //   jasmine.getEnv().addReporter(htmlScreenshoReporter);
  // },
  //
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--window-size=1920,2024'] 
    }
  },

  // Fraework to use. Jasmine is recommended.


  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['ex_spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true
  }
  
};