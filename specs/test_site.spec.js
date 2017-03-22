/**
 * Created by QA on 21.03.2017.
 */

"use strict";
var home = require('../pages/HomePage.js');

describe('Create E2E tests for Login and Profile pages with using followingtest-cases.', function () {

    beforeEach(function () {
        browser.driver.manage().deleteAllCookies();
    });


    it('Authorization page (Welcome back!)', function() {
        home.go();
        expect( home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        var login = home.goAuthorizationPage();
        expect( login.titleAuthorizationPage().getAttribute('text')).toBe("Sign In | SSLs.com");

        login.writeLoginAndPass("ssls.automation+5@gmail.com","123456");
        expect( login.inspectPasswordIsDisplayed().getAttribute('value')).toBe("123456");

        var dashboard = login.clickBtnLogin();
        expect( dashboard.titleDashboardPage().getAttribute('text')).toBe("SSL Certificates. Buy Cheap SSL Certs from $4.99/yr");
        expect( dashboard.getNickName().getAttribute('text')).toBe("ssls.automation+5@gmail.com");
        expect( dashboard.getSubMenu().getAttribute('style')).toBe("display: block;");
       // dashboard.getClickLogOut();

    });

    it('Authorization page. Not registered user', function () {
        home.go();
        expect(home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        var login = home.goAuthorizationPage();
        expect(login.titleAuthorizationPage().getAttribute('text')).toBe("Sign In | SSLs.com");

        login.writeLoginAndPass("artur3280n@gmail.com", "123456");
        expect(login.inspectPasswordIsDisplayed().getAttribute('value')).toBe("123456");
        login.clickBtnLogin();
        browser.sleep(1000);
        expect(login.getErroreMsg().getText()).toEqual("Uh oh! Email or password is incorrect");
    });

    it('Authorization page. Invalid email', function () {
        home.go();
        expect(home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        var login = home.goAuthorizationPage();
        expect(login.titleAuthorizationPage().getAttribute('text')).toBe("Sign In | SSLs.com");

        login.writeLoginAndPass("(eg. test@@test.com)", "123456");
        expect(login.inspectPasswordIsDisplayed().getAttribute('value')).toBe("123456");
        login.clickBtnLogin();

        login.getErrorMsgEmail().then(function (text) {
                expect(text.replace(/\n/g, ' ')).toEqual("Uh oh! This isn’t an email")
        });

    });

    it('Authorization page. Empty fields', function () {
        home.go();
        expect(home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        var login = home.goAuthorizationPage();
        expect(login.titleAuthorizationPage().getAttribute('text')).toBe("Sign In | SSLs.com");

        login.writeLoginAndPass("", "");

        login.clickBtnLogin();

        login.getErrorMsgEnterEmail().then(function (text) {
                expect(text.replace(/\n/g, ' ')).toEqual("Oops, please enter your email")
        });

        login.getErrorMsgPass().then(function (text) {
                expect(text.replace(/\n/g, ' ')).toEqual("Looks like you’ve missed this one")
        });

    });

    it('Log Out.', function() {
        home.go();
        expect( home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        var login = home.goAuthorizationPage();
        expect( login.titleAuthorizationPage().getAttribute('text')).toBe("Sign In | SSLs.com");

        login.writeLoginAndPass("ssls.automation+5@gmail.com","123456");
        expect( login.inspectPasswordIsDisplayed().getAttribute('value')).toBe("123456");

        var dashboard = login.clickBtnLogin();
        expect( dashboard.titleDashboardPage().getAttribute('text')).toBe("SSL Certificates. Buy Cheap SSL Certs from $4.99/yr");
        expect( dashboard.getNickName().getAttribute('text')).toBe("ssls.automation+5@gmail.com");
        expect( dashboard.getSubMenu().getAttribute('style')).toBe("display: block;");
        var autorPage=dashboard.getClickLogOut();

        autorPage.getUrlPage().then(function(actualUrl) {
            expect(actualUrl).toEqual("https://www.ssls.com/authorize");
        });
    });

    it('My profile page. Client area', function() {
        home.go();
        expect( home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        var login = home.goAuthorizationPage();
        expect( login.titleAuthorizationPage().getAttribute('text')).toBe("Sign In | SSLs.com");

        login.writeLoginAndPass("ssls.automation+5@gmail.com","123456");
        expect( login.inspectPasswordIsDisplayed().getAttribute('value')).toBe("123456");

        var dashboard = login.clickBtnLogin();
        expect( dashboard.titleDashboardPage().getAttribute('text')).toBe("SSL Certificates. Buy Cheap SSL Certs from $4.99/yr");
        expect( dashboard.getNickName().getAttribute('text')).toBe("ssls.automation+5@gmail.com");
        expect( dashboard.getSubMenu().getAttribute('style')).toBe("display: block;");
        var profilePage=dashboard.getClickMyProfileLink();
        expect( profilePage.titleProfilePage().getAttribute('text')).toBe("My Profile | SSLs.com");
        expect( profilePage.inspectViewTitlePage()).toBe(true);

        var data=['John Doe',
                'ssls.automation+5@gmail.com',
                '*****',
                '+1 0001234567',
                'Diagon alley 2, Misto, Uryupinsk 612120, Ukraine',
                'lDkk'];
        expect( profilePage.getProfileDescription()).toEqual(data);
    });

    it('My profile page. Refresh support pin', function() {
        home.go();
        expect( home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        var login = home.goAuthorizationPage();
        expect( login.titleAuthorizationPage().getAttribute('text')).toBe("Sign In | SSLs.com");

        login.writeLoginAndPass("ssls.automation+5@gmail.com","123456");
        expect( login.inspectPasswordIsDisplayed().getAttribute('value')).toBe("123456");

        var dashboard = login.clickBtnLogin();
        expect( dashboard.titleDashboardPage().getAttribute('text')).toBe("SSL Certificates. Buy Cheap SSL Certs from $4.99/yr");
        expect( dashboard.getNickName().getAttribute('text')).toBe("ssls.automation+5@gmail.com");
        expect( dashboard.getSubMenu().getAttribute('style')).toBe("display: block;");
        var profilePage=dashboard.getClickMyProfileLink();
        expect( profilePage.titleProfilePage().getAttribute('text')).toBe("My Profile | SSLs.com");
        expect( profilePage.inspectViewTitlePage()).toBe(true);

       profilePage.getGenerateNewPin().then(function (oldPin) {
           expect( oldPin === profilePage.getSupportPin()).toBe(false);
               });
    });

    it('Home page. Filters', function () {
        home.go();
        expect(home.titleHomePage().getAttribute('text')).toBe('SSL Certificates. Buy Cheap SSL Certs from $4.99/yr');
        expect(home.getCountSslItems() === home.getApplyFilterPersonalSslItem()).toBe(false);
        expect(home.getApplyFilterPersonalSslItem() === home.getApplyFilterMultiDomainSslItem()).toBe(false);

        expect(home.inspectCheapestSort()).toBe(true);
        home.ClickCheapestSort();
        expect(home.inspectFeaturedSort()).toBe(true);
        home.ClickFeaturedSort();
        expect(home.inspectCheapestSort()).toBe(true);


    });


});
