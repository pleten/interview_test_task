'user strict';

var homePage = function(){

  var _loginBtn = element(by.css('.log-box'));

	this.goToLoginPage = function(){
    return _loginBtn.click();
	};

	this.getUserName = function(){
		return element(by.css('.profile-box .user-btn')).getText();
	};

  this.logOut=function(){
    var _dropdownBtn = element(by.css('.dropdown-btn'));
    _dropdownBtn.click()
		return element(by.css('[ng-click="logout()"]')).click();
	};

  this.goToProfilePage=function(){
    var _dropdownBtn = element(by.css('.dropdown-btn'));
    _dropdownBtn.click()
  	return element(by.css('[ui-sref="user.profile"]')).click();
	};

};
module.exports = new homePage();
