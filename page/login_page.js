
var login_page = function(){


	var _emailField = element(by.model('form.email'));
	var _passwordField = element(by.model('form.password'));
	var _showPassBtn = element(by.css('button[ng-click*="showPassword"]'));
	var _loginBtn = element.all(by.css('[class="btn block primary"]'));

	var EC = protractor.ExpectedConditions;
	
	this.inputEmail = function(email){
		_emailField.sendKeys(email);
	};
	
	this.inputPassword = function(password){
		_passwordField.sendKeys(password);
	};
	
	this.fillLoginForm = function(email, password){
		this.inputEmail(email);
		this.inputPassword(password);
	};
	
	this.logIn = function(email, password){
        this.fillLoginForm(email, password);
        this.submitLoginForm();
	}
	
	this.submitLoginForm = function(){
		_loginBtn.click();
		return require('./home_page.js');
	};
	
	this.showPassword = function(){
		_showPassBtn.click();
		return _passwordField.getAttribute('value').then(function(text){
			return text;
		});
	};

	this.getErrorMessage=function(){
		var messageBy = by.xpath("//span[@class='noty_text']");
        browser.wait(EC.presenceOf(element(messageBy)), 5000);
		return element(messageBy).getText().then(function(text){
			return text;
		});
	};

    this.getEmailValidationMessage=function(){
		var messageBy = by.xpath("//div[@class='form-group email']//div[@class='left-tooltip-box']//span");
        browser.wait(EC.presenceOf(element(messageBy)), 5000);
        return element(messageBy).getText().then(function(text){
        	text = text.replace(/\r?\n|\r/g, " ");
            return text;
        });
    };

    this.getPasswordValidationMessage=function(){
        var messageBy = by.xpath("//div[@class='form-group']//div[@class='left-tooltip-box']//span");
        browser.wait(EC.presenceOf(element(messageBy)), 5000);
        return element(messageBy).getText().then(function(text){
            text = text.replace(/\r?\n|\r/g, " ");
            return text;
        });
    };

};

module.exports = new login_page();