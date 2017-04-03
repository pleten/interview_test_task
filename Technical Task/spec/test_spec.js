describe ("The first test ever", function(){
	
	var until = protractor.ExpectedConditions;
	var home_page = require('../page/home_page.js');
	var email = "ssls.automation+5@gmail.com";
	var passwordValue = "123456" ;
	var signInTitle = "Sign In | SSLs.com";
	var welcomePageElementToCheck = "CHAT & TICKET";
	
	var welcomePageTitleSelector = $("a[class='btn control block round']");
	var logOutLink = $('button.drop-button');
	var userOptionsDropDown = $("button[class='btn btn-s round filled dropdown-btn ng-isolate-scope']");
	
	beforeEach(function(){
		browser.get("https://ssls.com");	
		expect(welcomePageTitleSelector.getText()).toBe(welcomePageElementToCheck);
	});
	
	it ("1. Authorization page (Welcome back!)", function(){
		
		var authorization_page = home_page.clickOnLoginLink();
		
		expect(element(by.css("title")).getAttribute("text")).toBe(signInTitle)		
		authorization_page.enterEmail(email);
		authorization_page.enterPassword(passwordValue);
		authorization_page.clickOnEyeIcon();
		var actualPassword = authorization_page.getDisplayedPassword();
		expect(actualPassword).toBe(passwordValue);
		var ssl_certificates_page = authorization_page.clickOnLoginButton();
		expect(ssl_certificates_page.getCertificatesButtonText()).toBe(email)
		userOptionsDropDown.click();
		logOutLink.click();
	});
	
	var incorrectEmail = "abra@test.com";
	var incorrectPass = "incorrectPass";
	var errorMessage = "Uh oh! Email or password is incorrect";
	it ("2. Authorization page. Not Registered user", function(){
		expect(welcomePageTitleSelector.getText()).toBe(welcomePageElementToCheck);
		var authorization_page = home_page.clickOnLoginLink();
		expect(element(by.css("title")).getAttribute("text")).toBe(signInTitle);
		authorization_page.enterEmail(incorrectEmail);
		authorization_page.enterPassword(incorrectPass);
		authorization_page.clickOnEyeIcon();
		authorization_page.clickOnLoginButton();
		expect(authorization_page.getGeneralErrorMessage()).toBe(errorMessage);
		
	});
	
	var incorrectEmail2 = "abratest.com";
	var errorMessage2 = "Uh oh! This\nisn’t an email";
	it ("3. Authorization page. Invalid email", function(){
		expect(welcomePageTitleSelector.getText()).toBe(welcomePageElementToCheck);
		var authorization_page = home_page.clickOnLoginLink();
		expect(element(by.css("title")).getAttribute("text")).toBe(signInTitle)		;
		authorization_page.enterEmail(incorrectEmail2);
		authorization_page.enterPassword(passwordValue);
		authorization_page.clickOnEyeIcon();
		authorization_page.clickOnLoginButton();
		expect(authorization_page.getEmailErrorMessage(0)).toBe(errorMessage2);
		
	});
	
	var emailErrorMessage2 = "Oops, please\nenter your email";
	var passwordErrorMessage = "Looks like you’ve\nmissed this one";
	it ("4. Authorization page. Empty fields", function(){
		expect(welcomePageTitleSelector.getText()).toBe(welcomePageElementToCheck);
		var authorization_page = home_page.clickOnLoginLink();
		expect(element(by.css("title")).getAttribute("text")).toBe(signInTitle)		;
		authorization_page.clickOnLoginButton();
		expect(authorization_page.getEmailErrorMessage(1)).toBe(emailErrorMessage2);
		expect(authorization_page.getPasswordErrorMessage(2)).toBe(passwordErrorMessage);
		
		
	});
	
	describe ("Log out verification", function(){
		var authorization_page;
		var expectedAuthorizedLink = "https://www.ssls.com/authorize";
		beforeEach(function(){
			expect(welcomePageTitleSelector.getText()).toBe(welcomePageElementToCheck);
			authorization_page = home_page.clickOnLoginLink();
			authorization_page.enterEmail(email);
			authorization_page.enterPassword(passwordValue);
			authorization_page.clickOnLoginButton();
		
		});
		
		it("5. Log out", function(){
			browser.wait(until.presenceOf(userOptionsDropDown), 5000, 'Element taking too long to appear in the DOM');
			userOptionsDropDown.click();
			logOutLink.click();
			expect(browser.getCurrentUrl()).toBe(expectedAuthorizedLink);
		
		});
	});
	
	
	describe ("My Profile page tests", function(){
		var authorization_page;
		var actualName;
		var actualEmail;
		var actualPassword;
		var actualPhone;
		var actualAddress;
		var actualPin;
		var actualNewsLetterOption;
		var viewProfileTitle = "My Profile | SSLs.com";
		
		beforeEach(function(){
			expect(welcomePageTitleSelector.getText()).toBe(welcomePageElementToCheck);
			authorization_page = home_page.clickOnLoginLink();
			authorization_page.enterEmail(email);
			authorization_page.enterPassword(passwordValue);
			authorization_page.clickOnLoginButton();
			userOptionsDropDown.click();
			var viewProfilePage = authorization_page.clickOnViewProfileLink();
			expect(element(by.css("title")).getAttribute("text")).toBe(viewProfileTitle);
			//check that page opened expect
			actualName = viewProfilePage.getName();
			actualEmail = viewProfilePage.getEmail();
			actualPassword = viewProfilePage.getPassword();
			actualPhone = viewProfilePage.getPhone();
			actualAddress = viewProfilePage.getAddress();
			actualPin = viewProfilePage.getSupportPin();
			actualNewsLetterOption = viewProfilePage.getNewsLetterOption();
			console.log(actualName);
			console.log(actualEmail);
			console.log(actualPassword);
			console.log(actualPhone);
			console.log(actualAddress);
			console.log(actualPin);
			console.log(actualNewsLetterOption);
			browser.wait(until.presenceOf(userOptionsDropDown), 5000, 'Element taking too long to appear in the DOM');
			userOptionsDropDown.click();
			logOutLink.click();
			
			
		});
		
			it("6. Client Area", function(){
				authorization_page = home_page.clickOnLoginLink();
				authorization_page.enterEmail(email);
				authorization_page.enterPassword(passwordValue);
				authorization_page.clickOnLoginButton();
				userOptionsDropDown.click();
				var viewProfilePage = authorization_page.clickOnViewProfileLink();
				expect(element(by.css("title")).getAttribute("text")).toBe(viewProfileTitle);
				expect(actualName).toBe(viewProfilePage.getName());
				expect(actualEmail).toBe(viewProfilePage.getEmail());
				expect(actualPassword).toBe(viewProfilePage.getPassword());
				expect(actualPhone).toBe(viewProfilePage.getPhone());
				expect(actualAddress).toBe(viewProfilePage.getAddress());
				expect(actualPin).toBe(viewProfilePage.getSupportPin());
				expect(actualNewsLetterOption).toBe(viewProfilePage.getNewsLetterOption());
				userOptionsDropDown.click();
				logOutLink.click();
			
			});
		
	});
	
	describe ("My Profile page ", function(){	
		var authorization_page;
		beforeEach(function(){
			expect(welcomePageTitleSelector.getText()).toBe(welcomePageElementToCheck);
			authorization_page = home_page.clickOnLoginLink();
			authorization_page.enterEmail(email);
			authorization_page.enterPassword(passwordValue);
			authorization_page.clickOnLoginButton();
		
		});
		it("7. Refresh support pin", function(){
			userOptionsDropDown.click();
			var viewProfilePage = authorization_page.clickOnViewProfileLink();
			var oldSupportPinText = viewProfilePage.getSupportPin();
			viewProfilePage.clickOnUpdateSupportPinButton();
			var newSupportPinText = viewProfilePage.getSupportPin();
			expect(oldSupportPinText).not.toEqual(newSupportPinText);
						
		});
			
	});
	
	it("8. Home Page", function(){
		var defaultPriceFilterText = "Featured";
		var cheapestPriceFilterText = "Cheapest"
		//Personal filter check
		home_page.clickOnPersonalFilter("Personal");	
		var lowAssuranceCertificatesCount = home_page.getLowAssuranceCertificateLabels().length;
		var displayedCertificatesCount = home_page.getDisplayedCertificatesCount();
		expect(lowAssuranceCertificatesCount).toEqual(displayedCertificatesCount);	
		//Personal+ MultiDomain filters check
		home_page.clickOnPersonalFilter("multi-domain");
		lowAssuranceCertificatesCount = home_page.getLowAssuranceCertificateLabels().length;
		displayedCertificatesCount = home_page.getDisplayedCertificatesCount();	
		expect(lowAssuranceCertificatesCount).toEqual(displayedCertificatesCount);	
		expect(home_page.getNumberOfMultiDomainCertificates()).toEqual(displayedCertificatesCount);
		//to check that filters Featured/Cheapest works  correctly
		//there' only 1 certificate is displayed 
		
	});
	
});






