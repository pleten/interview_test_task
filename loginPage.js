'user strict';

var loginPage = function(){

	var _emailFld = element(by.model('form.email'));
	var _passFld = element(by.model('form.password'));
	var _showPassBtn = element(by.css('[ng-hide="showPassword"]'));
	var _loginBtn = element(by.css('[type="submit"]'));

	this.logIn = function(email, pass, sbm){
    _emailFld.sendKeys(email);
    _passFld.sendKeys(pass);
    if (sbm) { this.submit(); };
    return (true);
	};

  this.showPass = function(){
		_showPassBtn.click();
		return _passFld.getAttribute('value').then(function(pass){
			return pass;
		});
	};

	this.submit = function(){
		return _loginBtn.click();
	};

  this.getErrMsg=function(locator){
		var locator;
		var EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.css(locator))), 5000);
		return element(by.css(locator)).getText().then(function(text){
			return text.trim();
		});
	};

  this.getEmailValidErr=function(){
    var EC = protractor.ExpectedConditions;
	  var selForEmail = by.xpath("//div[@class='form-group email']//div[@class='left-tooltip-box']//span");
    browser.wait(EC.presenceOf(element(selForEmail)), 5000);
    return element(selForEmail).getText().then(function(text){
        return text.replace(/\r?\n|\r/g, " ");
      });
    };

  this.getPassValidErr=function(){
    var EC = protractor.ExpectedConditions;
    var selForPass = by.xpath("//div[@class='form-group']//div[@class='left-tooltip-box']//span");
    browser.wait(EC.presenceOf(element(selForPass)), 5000);
    return element(selForPass).getText().then(function(text){
      return text.replace(/\r?\n|\r/g, " ");
    });
  };
};
module.exports = new loginPage();
