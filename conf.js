require('babel-core/register')({
  presets: [
    'es2015',
  ],
});

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	framework: 'jasmine2',
	capabilities: {
    	browserName: 'chrome'
    },
	specs: ['./specs/*.spec.js'],
	onPrepare: function(){
    browser.manage().timeouts().implicitlyWait(15000);
	}
}