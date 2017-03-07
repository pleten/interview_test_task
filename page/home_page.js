require('../page/login_page.js');
require ('../page/header.js');
var home_page = function(){

    var _header = require('./header.js');

	
	this.openLoginForm = function(){
		return _header.openLoginForm();
	};
	
	this.getLoginButtonText = function(){
		return _header.getLoginButtonText();
	};

	this.logOut=function(){
		return _header.logOut();
	};

};
module.exports = new home_page();