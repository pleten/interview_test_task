'user strict';

const startPage = 'https://www.ssls.com/';
const authPage = 'https://www.ssls.com/authorize';
const profPage = 'https://www.ssls.com/user/profile';
const email = 'ssls.automation+4@gmail.com';
const pass = '123456';

describe('Authorization page check:', function(){

  beforeEach(function(){
		browser.get(startPage);
    browser.manage().window().maximize();
	});

  it('1. Authorization page (Welcome back!).', function(){
    expect(browser.getCurrentUrl()).toEqual(startPage);
    var homePage = require('./homePage.js');
    homePage.goToLoginPage();
    expect(browser.getCurrentUrl()).toEqual(authPage);
    var loginPage = require('./loginPage.js');
    loginPage.logIn(email,pass);
    loginPage.showPass().then(function(text){
			expect(text).toEqual(pass);
  	});
    loginPage.submit()
    expect(browser.getCurrentUrl()).toEqual(startPage);
    expect(homePage.getUserName()).toEqual(email);
    homePage.logOut();
	});

  it('2. Authorization page. Not registered user.', function(){
    var email = (Math.random())+'@gmail.com';
    const pass = '123456';
    const verErrMess = "Uh oh! Email or password is incorrect";
    var homePage = require('./homePage.js');
    homePage.goToLoginPage();
    var loginPage = require('./loginPage.js');
    loginPage.logIn(email,pass,true);
    expect(loginPage.getErrMsg(".noty_message")).toEqual(verErrMess);
	});

  it('3. Authorization page. Invalid email.', function(){
    var email = (Math.random())+'@@gmail.com';
    const pass = '123456';
    const verMessEmail = "Uh oh! This isn’t an email";
    var homePage = require('./homePage.js');
    homePage.goToLoginPage();
    var loginPage = require('./loginPage.js');
    loginPage.logIn(email,pass,true);
    expect(loginPage.getEmailValidErr()).toEqual(verMessEmail);
	});

  it('4. Authorization page. Empty fields.', function(){
    const verMessEmail = "Oops, please enter your email";
    const verMessPass = "Looks like you’ve missed this one";
    var homePage = require('./homePage.js');
    homePage.goToLoginPage();
    var loginPage = require('./loginPage.js');
    loginPage.logIn("","",true);
    expect(loginPage.getEmailValidErr()).toEqual(verMessEmail);
    expect(loginPage.getPassValidErr()).toEqual(verMessPass);
	});

  it('5. Log Out.', function(){
    var homePage = require('./homePage.js');
    homePage.goToLoginPage();
    var loginPage = require('./loginPage.js');
    loginPage.logIn(email,pass,true);
    expect(browser.getCurrentUrl()).toEqual(startPage);
    homePage.logOut();
    expect(browser.getCurrentUrl()).toEqual(authPage);
  });
});


describe('Profile page check:', function(){

  beforeEach(function(){
		browser.get(startPage);
	});

  it('6. My profile page. Client area.', function(){
    var homePage = require('./homePage.js');
    var bindingRows = ["name","email","password","phone","address"]
    homePage.goToLoginPage();
    var loginPage = require('./loginPage.js');
    loginPage.logIn(email,pass,true);
    homePage.goToProfilePage();
    expect(browser.getCurrentUrl()).toEqual(profPage);
    var profilePage = require('./profilePage.js');
    for (var i=0; i<5; i++){
      expect( profilePage.getItemText(bindingRows[i])).not.toEqual("");
    };
    expect(element.all(by.css('.text.ng-binding')).get(5).getText()).not.toEqual("");
    expect(element(by.css('.text.mail-list')).getText()).not.toEqual("");
    homePage.logOut();
	});

  it('7. My profile page. Refresh support pin.', function(){
    var homePage = require('./homePage.js');
    homePage.goToLoginPage();
    var loginPage = require('./loginPage.js');
    loginPage.logIn(email,pass,true);
    homePage.goToProfilePage();
    var profilePage = require('./profilePage.js');
    var oldPin = element.all(by.css('.text.ng-binding')).get(5).getText()
    expect(profilePage.updatePin()).not.toEqual(oldPin);
    homePage.logOut();
	});
});


describe('Home page check:', function(){

  beforeEach(function(){
		browser.get(startPage);
	});

  it('8. Home page. Filters.', function(){
    var homePage = require('./homePage.js');

    expect(element.all(by.css('.ssl-item')).count()).toEqual(13);
    element.all(by.css('.filter-item')).get(0).click()
    expect(element.all(by.css('.filter-item .active')).count()).toEqual(1);
    expect(element.all(by.css('.ssl-item')).count()).toEqual(3);
    element.all(by.css('.filter-item')).get(4).click()
    expect(element.all(by.css('.filter-item .active')).count()).toEqual(2);
    expect(element.all(by.css('.ssl-item')).count()).toEqual(1);

	});

});
