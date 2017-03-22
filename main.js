 
exports.config = {
	
	rootElement: '#ng-app',
  seleniumAddress: 'http://localhost:4444/wd/hub',
 
	
  
  capabilities: {
    'browserName': 'chrome'
  },
  
  specs: ['test.js'],
  allScriptsTimeout: 30000,

  onPrepare: function(){
    browser.params = {'url': 'https://www.ssls.com/','email':"ssls.automation+5@gmail.com", 'pass':"123456"}
  },

  
  jasmineNodeOpts: {
    showColors: true,
	includeStackTrace : true,
    isVerbose : false,
    defaultTimeoutInterval: 30000
  }
};