describe('Authorization Page.', function(){
	
	beforeEach(function(){
		browser.get(browser.params.url);
		
	});
	afterEach(function(){
		browser.manage().deleteAllCookies();
	});

		it('Welcome back', function(){
			var startpage = require('./pageobjects/homepage');
			
			expect(browser.getCurrentUrl()).toEqual(startpage.selfUrl);
			var authForm = startpage.getAuthForm();
			expect(browser.getCurrentUrl()).toEqual(authForm.selfUrl);
			authForm.sendCredentials(browser.params.email, browser.params.pass);
			authForm.showpwd();
			expect(authForm.pwdisVisible()).toEqual(true);
			var homepage = authForm.login();
			expect(homepage.user_cert_button().getText()).toEqual(browser.params.email);
			});
			
        it('Not registered user', function(){
			var startpage = require('./pageobjects/homepage');
			//fake account data
			var not_ref_email = 'ssls.auto@gmail.com';
			var not_valid_password = 'iamnotvalid';

			expect(browser.getCurrentUrl()).toEqual(startpage.selfUrl);
			var authForm = startpage.getAuthForm();
			expect(browser.getCurrentUrl()).toEqual(authForm.selfUrl);
			authForm.sendCredentials(not_ref_email, not_valid_password);
			authForm.showpwd();
			expect(authForm.pwdisVisible()).toEqual(true);
			authForm.login();
			expect(authForm.autherror().getText()).toEqual('Uh oh! Email or password is incorrect');
		});

		it('Invalid email', function(){
			var startpage = require('./pageobjects/homepage');
			//fake account data
			var invalid_email = 'test@@test.com';
			var password = 'iamnotvalid';

			expect(browser.getCurrentUrl()).toEqual(startpage.selfUrl);
			var authForm = startpage.getAuthForm();
			expect(browser.getCurrentUrl()).toEqual(authForm.selfUrl);
			authForm.sendCredentials(invalid_email, password);
			authForm.showpwd();
			expect(authForm.pwdisVisible()).toEqual(true);
			authForm.login();
			expect(authForm.emailerror()).toEqual('Uh oh! This isn’t an email');
		});

		it('Empty fields', function(){
			var startpage = require('./pageobjects/homepage');

			expect(browser.getCurrentUrl()).toEqual(startpage.selfUrl);
			var authForm = startpage.getAuthForm();
			expect(browser.getCurrentUrl()).toEqual(authForm.selfUrl);
			authForm.login();
			expect(authForm.emailerror()).toEqual('Oops, please enter your email');
			expect(authForm.pwderror()).toEqual('Looks like you’ve missed this one');
		});

	});

xdescribe("Profile page", function(){

    beforeEach(function(){

		browser.get(browser.params.url);
        var startpage = require('./pageobjects/homepage');
        authform = startpage.getAuthForm();
        authForm.sendCredentials(browser.params.email, browser.params.password);
        authform.login()

	});

	afterEach(function() {
        browser.manage().deleteAllCookies();
    });

        it('Log Out', function(){
            var homepage = require('./pageobjects/homepage');
            authpage = homepage.logout();
            expect(browser.getCurrentUrl()).toEqual(authpage.selfUrl);
        });

        xit('Client area', function(){
            var homepage = require('./pageobjects/homepage');
            homepage.selectfromMenu('View profile');
            expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/user/profile');
        })
});
	


