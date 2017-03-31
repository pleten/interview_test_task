exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/**/*.spec.js'],
  baseUrl: 'https://www.ssls.com',
  multiCapabilities: [
    {
      browserName: 'firefox'
    },
    {
      browserName: 'chrome'
    }
  ],
  onPrepare: function(){
    browser.driver.manage().window().maximize();
    browser.get(browser.baseUrl);
  },
  jasmineNodeOpts: {
    showColors: true
  },
  getPageTimeout: 20000
};
