var view_profile_page = function(){
	var until = protractor.ExpectedConditions;
	var name = $("span[ng-hide*='name']");
	var email = $("span[ng-hide*='email']");
	var passwordValue = $("span[ng-hide*='password']");
	var phone = $("span[ng-hide*='phone']");
	var address = $("span[ng-hide*='address']");
	var pin = $("div[ng-class*='pin'] span.ng-binding");
	var newsLetterOptionCheckbox = $("input[name*='newsletter']");
	var updatePinIcon = $("span[class='icon icon-arrows-cw']")
	
	this.getName = function(){
		return name.getText();
	}
	
	this.getEmail = function(){
		return email.getText();
	}
	this.getPassword = function(){
		return passwordValue.getText();
	}
	this.getPhone = function(){
		return phone.getText();
	}
	this.getAddress = function(){
		return address.getText();
	}
	this.getSupportPin = function(){
		return pin.getText();
	}
	this.getNewsLetterOption = function(){
		return newsLetterOptionCheckbox.getAttribute('value');
	}
	this.clickOnUpdateSupportPinButton = function(){
		updatePinIcon.click();
		browser.sleep(2000);
	}
	
		
}
module.exports =  new view_profile_page();