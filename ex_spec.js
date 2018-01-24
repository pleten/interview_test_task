var page = require('./page/loginPage.js');
var profile = require('./page/profilePage.js');
var home = require('./page/homePage');


describe ("Login in the system", function () {
    beforeEach(function () {
        home.goto('https://www.ssls.com/');
        
    });

    it("Authorization page. Empty fields",function () {
        
        page.header_link('LOG IN');
        page.button_login('LOGIN');
        expect(page.email_field_error('Oops, please', 'enter your email')).toBe(true);
        expect(page.pass_field_error('Looks like you’ve', 'missed this one')).toBe(true);

    });

    it("Authorization page. Not registered user",function () {
    
         page.header_link('LOG IN');
         page.email_field('ssls.automat5ion+5@gmail.com');
         page.password_field('123456');
    
         page.button_login('LOGIN');
         expect(page.wait_element('Uh oh! Email or password is incorrect')).toBe(true);

    });
    
    it("Authorization page. Invalid email", function () {
    
        page.header_link('LOG IN');
        page.email_field('test@@test.com');
        page.password_field('123456');
        expect(page.email_field_error('Uh oh! This', 'isn’t an email')).toBe(true);

    });
    
    it("Authorization page (Welcome back!)",function () {
    
        page.header_link('LOG IN');
        page.email_field('ssls.automation+5@gmail.com');
        page.password_field('123456');
        page.eye_password();
        expect(page.show_password());
        page.button_login('LOGIN');
        expect(page.welcome_back()).toEqual('ssls.automation+5@gmail.com');
        page.logger('Authorization page (Welcome back!)');
        page.drop_down_header();
        page.logout();
        page.getUrl('https://www.ssls.com/authorize');
        page.form_auth('Welcome back!');

    });
    
    it("My profile page. Client area",function () {
    
        page.header_link('LOG IN');
        page.email_field('ssls.automation+5@gmail.com');
        page.password_field('123456');
    
        page.eye_password();
        expect(page.show_password());
        page.button_login('LOGIN');
        expect(page.welcome_back()).toEqual('ssls.automation+5@gmail.com');
        page.logger('Authorization page (Welcome back!)');
        page.drop_down_header();
        profile.profile();
        expect(profile.title_profile());
        expect(profile.view_profile_fields('Name'));
        expect(profile.fields('Vasya Pupkin'));
    
        expect(profile.view_profile_fields('Email'));
        expect(profile.fields('ssls.automation+5@gmail.com'));
    
        expect(profile.view_profile_fields('Password'));
        expect(profile.fields('*****'));
    
        expect(profile.view_profile_fields('Phone'));
        expect(profile.fields('+380 57123456789'));
    
        expect(profile.view_profile_fields('Address'));
        expect(profile.fields('Diagon alley 2, Misto, Uryupinsk 612120, Ukraine'));
    
        expect(profile.view_profile_fields('Support pin'));
        //expect(profile.update_pin()).not.toBe(null);
    
        expect(profile.view_profile_fields('Newsletter'));
        expect(profile.fields('Include in mailing list'));

    });
    
    it ("My profile page. Refresh support pin", function () {
        page.drop_down_header();
        profile.profile();
        profile.support_pin();
        expect(profile.update_pin()).not.toBe(null);

    });
    
    
    it ("Home page. Filters", function () {
        home.button_cheapest('CHEAPEST');
        home.check_cheapest();

        home.button_featured('FEATURED');
        home.check_featured();
        
        home.refresh();
    
        home.button_personal('PERSONAL');
        home.check_sorting_personal();
        home.button_multi('MULTI-DOMAIN');
        expect(home.check_sorting_multi()).toEqual('PositiveSSL Multi-Domain');

     });


});


