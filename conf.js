exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./specs/authorizationSpec.js',
    './specs/myProfileSpec.js',
    './specs/homeSpec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  restartBrowserBetweenTests: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--headless",
        "--disable-gpu", "--window-size=1024,768"]
    }
  },
  onPrepare: function () {
    browser.manage().timeouts().implicitlyWait(5000);
  },
}