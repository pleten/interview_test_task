// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  chromeOnly: true,
  directConnect: true,
  // restartBrowserBetweenTests: true,
}