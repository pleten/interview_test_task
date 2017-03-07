describe('Verify authorization page.', function(){
	var siteUrl = 'https://ssls.com';
	beforeEach(function(){
		browser.get(siteUrl);
	});
	
    describe('Verify login with registered user.', function(){

		afterEach(function(){
			home_page.logOut();
		});

		var email = 'ssls.automation+4@gmail.com';
		var password = '123456';
		var home_page = require('../page/home_page.js');

		it('User should be logged in and redirected to home page.', function(){
			var login_page=home_page.openLoginForm();
			login_page.fillLoginForm(email,password);
			login_page.showPassword().then(function(pwdValue){
				expect(pwdValue).toEqual(password);
			});
			login_page.submitLoginForm();
			expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/');
			home_page.getLoginButtonText().then(function(loginValue){
				expect(loginValue).toEqual(email);
			});
		});

    });

    describe('Verify validation of login form.', function(){

        var home_page = require('../page/home_page.js');
        it('User should not be logged in with not registered email and get error message', function(){
            var email = 'user@gmail.com';
            var password = '123456';
            var login_page=home_page.openLoginForm();
            login_page.fillLoginForm(email,password);
            login_page.showPassword().then(function(pwdValue){
                expect(pwdValue).toEqual(password);
            });
            login_page.submitLoginForm();
            login_page.getErrorMessage().then(function(errorMessage){
            	expect(errorMessage).toEqual('Uh oh! Email or password is incorrect');
			});
        });

        it('User should get validation message of invalid email', function(){
            var email = 'user@@gmail.com';
            var password = '123456';
            var login_page=home_page.openLoginForm();
            login_page.fillLoginForm(email,password);
            login_page.showPassword().then(function(pwdValue){
                expect(pwdValue).toEqual(password);
            });
            login_page.getEmailValidationMessage().then(function(errorMessage){
                expect(errorMessage).toEqual('Uh oh! This isn’t an email');
            });
        });

        it('User should get validation message of empty email and password', function(){
            var login_page=home_page.openLoginForm();
            login_page.logIn('','');

            login_page.getEmailValidationMessage().then(function(errorMessage){
                expect(errorMessage).toEqual('Oops, please enter your email');
            });

            login_page.getPasswordValidationMessage().then(function(errorMessage){
                expect(errorMessage).toEqual('Looks like you’ve missed this one');
            });
        });

    });

    describe('Verify logged in users actions.', function(){

        var email = 'ssls.automation+4@gmail.com';
        var password = '123456';
        var home_page = require('../page/home_page.js');

    	beforeEach(function(){
            var login_page=home_page.openLoginForm();
            login_page.logIn(email, password);
		});

    	it('User should be logged out and redirected to login page.', function(){
            home_page.logOut();
            expect(browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
        });

    	describe('Verify My profile page.', function(){
            var _header = require('../page/header.js');

            afterEach(function(){
    	        _header.logOut();
            });

            it('Check profile page.', function(){
                var profile_page = _header.selectMenu('View profile');
                expect(profile_page.getTitle()).toEqual('Profile');
                expect(profile_page.getItemValue('Name')).not.toEqual('');
                expect(profile_page.getItemValue('Email')).not.toEqual('');
                expect(profile_page.getItemValue('Password')).not.toEqual('');
                expect(profile_page.getItemValue('Phone')).not.toEqual('');
                expect(profile_page.getItemValue('Address')).not.toEqual('');
                expect(profile_page.getItemValue('Support pin')).not.toEqual('');
                expect(profile_page.getNewsletterState()).not.toBeTruthy();
            });

            it('Verify refresh support pin', function(){
                var profile_page = _header.selectMenu('View profile');
                var oldPin = profile_page.getItemValue('Support pin');
                expect(profile_page.refreshSupportPin()).not.toEqual(oldPin);
            });

        });


	});
});



