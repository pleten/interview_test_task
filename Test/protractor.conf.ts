import { Config } from 'protractor';
var HtmlReporter = require('protractor-beautiful-reporter');

export let config: Config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  
  specs: [
  'tests/e2e/ui/**/*Spec.js'
  ],  
  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Keep 'noGlobals: false' to avoid error of reporter 
  noGlobals: false,  

  jasmineNodeOpts: {
    defaultTimeoutInterval: 300000
  },

  "SELENIUM_PROMISE_MANAGER": false,


  // Reporter
  onPrepare: function() {
    jasmine.getEnv().addReporter(new HtmlReporter({
       baseDirectory: 'Reports', 
       screenshotsSubfolder: 'images',
       jsonsSubfolder: 'jsons',
       takeScreenShotsOnlyForFailedSpecs: true,
       preserveDirectory: false
    }).getJasmine2Reporter());
 }
}; 
