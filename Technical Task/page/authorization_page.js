require('../page/ssl_certificates_page.js');
require('../page/view_profile_page.js');

var authorization_page = function(){
	
	var until = protractor.ExpectedConditions;
	var emailTextbox = element(by.model('form.email'));
	var passwordTextbox = element(by.model('form.password'));
	var eyeIcon = element(by.css("span[ng-hide='showPassword']"));
	var displayedPassword = element(by.css("input[name='password']"));
	var loginButton = element(by.buttonText('Login'));
	var pageTitle = element(by.css("title"));
	var generalErrorMessageLabel = $('span.noty_text');
	var emailErrorMessage = element.all(by.css('div.tooltip-box-error span.tooltip-text'));
	var passwordErrorMessage = element.all(by.css('div.tooltip-box-error span.tooltip-text'));
	var viewProfileLink = $("a[ui-sref='user.profile']");
	
	this.enterEmail = function(email){
		emailTextbox.sendKeys(email);
	}
	this.enterPassword = function(password){
		passwordTextbox.sendKeys(password);
	}
	
	this.clickOnEyeIcon =function(){
		eyeIcon.click();
	}
	
	this.getDisplayedPassword = function(){
		return displayedPassword.getAttribute('value');
	}
	
	this.clickOnLoginButton = function(){
		loginButton.click();
		return require('./ssl_certificates_page.js');
	}
	
	this.getTitle = function(){
		pageTitle.getAttribute("text");
	}
	
	this.getGeneralErrorMessage = function() {
		browser.wait(until.presenceOf(generalErrorMessageLabel), 5000, 'Element taking too long to appear in the DOM');
		generalErrorMessageLabel.click();
		return generalErrorMessageLabel.getText();
	}
	
	this.getEmailErrorMessage = function(index){
		browser.wait(until.presenceOf(emailErrorMessage), 5000, 'Element taking too long to appear in the DOM');
		emailErrorMessage.get(index).click();
		return emailErrorMessage.get(index).getText();		
	}
	
	this.getPasswordErrorMessage = function(index){		
		browser.wait(until.presenceOf(passwordErrorMessage), 5000, 'Element taking too long to appear in the DOM');
		passwordErrorMessage.get(index).click();
		return passwordErrorMessage.get(index).getText();		
	}
	
	this.clickOnViewProfileLink = function(){
			viewProfileLink.click();
			return require('./view_profile_page.js');		
	};
	
};
module.exports = new authorization_page();