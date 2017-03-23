//spec.js
describe('Authorization Page Demo', function() {
    var homepage = "https://ssls.com";
    var validemailforlogin = "ssls.automation+5@gmail.com";
    var validpasswordforlogin = "123456";
    var loginbuttonunlogged = element(by.css('.log-box > a'));
    var loginbuttonlogged = element(by.css('.log-box > div > a'));
    var loginfield = element(by.css(".form-group.email > input[name='email']"));
    var paswordfield = element(by.css("input[name='password']"));
    var password_shown_text = element(by.css("input[type='text']"));
    var eyeicon = element(by.css(".btn-input.btn-input-block"));
    var entersystembutton = element(by.css("form[name='authForm'] > div:nth-of-type(3) > button"));
    var incorrectmailmessage = element(by.css('.noty_text'));
    var notemailalert = element(by.css('.form-group.email > div:nth-of-type(1) > div > div:nth-of-type(1) > .tooltip-text'));
    var notpasswordalert=element(by.css('.input-group > .left-tooltip-box > div > div:nth-of-type(1) > .tooltip-text'));
    var usermenu=element(by.css('.log-box > div > button'));
    var logoutbutton=element(by.css('.drop-button'));
    var welcomeback=element(by.css("form[name='authForm'] > .text"));
    var profilemenu=element(by.css(".dropdown.ng-isolate-scope > li:nth-of-type(5) > .drop-link"));
    var pname=element(by.css("form[name='form'] > div:nth-of-type(1) > .description > span"));
    var editnamebutton=element(by.css("form[name='form'] > div:nth-of-type(1) > button"));
    var usernameedit=by.css("input[name='name']")
    var lastname=by.css("input[name='lastName']")
    var edituserbutton=by.css("input[name='lastName']")
    var email=element(by.css("button[type='submit']"));
    var editemailbutton=element(by.css(""));
    var password=element(by.css(""));
    var editpasswordbutton=element(by.css(""));
    var phone=element(by.css(""));
    var editphonebutton=element(by.css(""));
    var adress=element(by.css(""));
    var editadressbutton=element(by.css(""));
    var supportpin=element(by.css(""));
    var editsupportpin=element(by.css(""));
    var newsletter=element(by.css(""));




    beforeEach(function() {
        browser.get(homepage);
    });

    it('1. Authorization page (Welcome back!)', function() {
        loginbuttonunlogged.click();
        loginfield.sendKeys(validemailforlogin);
        paswordfield.sendKeys(validpasswordforlogin);
        eyeicon.click();
        expect(password_shown_text.getAttribute('value')).toEqual(validpasswordforlogin); //check why dinamically changing JS is nt reading
        entersystembutton.click();
        browser.waitForAngular();
        expect(loginbuttonlogged.getAttribute('value')).toEqual(validemailforlogin);
    });
// TODO: add readable
// for persons alerts on asserts

	it('2. Authorization page. Not registered user', function() {
		loginbuttonunlogged.click();
		loginfield.sendKeys(Date.now() + '@gmail.com');
		paswordfield.sendKeys(Date.now());
		entersystembutton.click();
		expect(incorrectmailmessage.getText()).toEqual('Uh oh! Email or password is incorrect');
	});


	it('3. Authorization page. Invalid email', function() {
		loginbuttonunlogged.click();
		loginfield.sendKeys(Date.now() + '@gmail.com');
		paswordfield.sendKeys(validpasswordforlogin);
		eyeicon.click();
		entersystembutton.click();
		expect(password_shown_text.getAttribute('value')).toEqual(validpasswordforlogin);
		loginfield.clear();
		loginfield.sendKeys('test@@test.com');
		entersystembutton.click();
		expect(notemailalert.getText()).toEqual('Uh oh! This isn’t an email should be displayed');
	});

	it('4. Authorization page. Empty fields', function() {
		loginbuttonunlogged.click();
		entersystembutton.click();
		expect(notemailalert.getText()).toEqual('Oops, please enter your email');
		expect(notpasswordalert.ggetText()).toEqual('Looks like you’ve missed this one');
	});

	it('5. Log Out.', function() {
		loginbuttonunlogged.click();
        loginfield.sendKeys(validemailforlogin);
        paswordfield.sendKeys(validpasswordforlogin);
        entersystembutton.click();
        usermenu.click();
        logoutbutton.click();
        expect(browser.getCurrentUrl()).toEqual(homepage+'/authorize');
        expect(welcomeback.getText()).toEqual('Welcome back!');
        });

    it('6. My profile page. Client area', function() {
        loginbuttonunlogged.click();
        loginfield.sendKeys(validemailforlogin);
        paswordfield.sendKeys(validpasswordforlogin);
        entersystembutton.click();
        usermenu.click();
        profilemenu.click();
        editnamebutton.click();






        //than we should logout and click on this button.
        //for moment of test writing there is no opportunity to work with these tests cause login and password has changed from test site
        });
});