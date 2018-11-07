import {Consts} from "../po/cfg/consts";
import { MainPO } from "../po/main";
import { AuthorizationPO } from "../po/authorization";
import {browser, protractor} from "protractor";
import * as using from "jasmine-data-provider";

describe('Test Authorization Page', function() {
    let constants: Consts = new Consts();
    let mainPage: MainPO = new MainPO();
    let authorizationPage: AuthorizationPO = new AuthorizationPO();

    function dataProvider(){
        return [
            {description: 'Authorization page (Welcome back!)', email: constants.userEmail, password: constants.userPassword, msg: '', authorized: true, errType: ''}
            ,{description: 'Authorization page. Not registered user', email: constants.userEmail+1, password: constants.userPassword, msg: 'Uh oh! Email or password is incorrect', authorized: false, errType: 'unknown user'}
            ,{description: 'Authorization page. Invalid email', email: 'test@@test.com', password: constants.userPassword, msg: 'Uh oh! This\nisn’t an email', authorized: false, errType: 'invalid email'}
            ,{description: 'Authorization page. Empty fields (email)', email: '', password: constants.userPassword, msg: 'Oops, please\nenter your email', authorized: false, errType: 'empty field'}
            ,{description: 'Authorization page. Empty fields (password)', email: constants.userEmail, password: '', msg: 'Looks like you’ve\nmissed this one', authorized: false, errType: 'empty field'}
            ]
    };
    
    afterAll(function() {
        protractor.browser.manage().deleteAllCookies();
        protractor.browser.executeScript('window.sessionStorage.clear();');
        protractor.browser.executeScript('window.localStorage.clear();');
    });
    
    using(dataProvider, function(data)
    {
        it(data.description, function () {
            mainPage.get();
            expect(protractor.browser.getCurrentUrl()).toEqual('https://www.ssls.com/');
            mainPage.startLogIn();
            expect(protractor.browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');

            authorizationPage.fillCredentials(data.email, data.password);
            if('' === data.msg)
                expect(authorizationPage.isEmailErrorShown()).toBeFalsy();
            else if ('invalid email' == data.errType){
                browser.wait(protractor.ExpectedConditions.visibilityOf(authorizationPage.fieldErrorMessage), 5000);
                expect(authorizationPage.fieldErrorMessage.getText()).toEqual(data.msg);
            }

            authorizationPage.showPassword();
            expect(authorizationPage.isPasswordHidden()).toBeFalsy();

            authorizationPage.logIn();
            if(data.authorized === true){
                expect(authorizationPage.isUserAuthenticated()).toBeTruthy();
                authorizationPage.logOut();
                expect(protractor.browser.getCurrentUrl()).toEqual('https://www.ssls.com/authorize');
            }
            if('unknown user' == data.errType)
            {browser.wait(protractor.ExpectedConditions.visibilityOf(authorizationPage.generalErrorMessage), 5000);
                expect(authorizationPage.generalErrorMessage.getText()).toEqual(data.msg);}

            if('empty field' == data.errType)
            {
                /*expect(authorizationPage.fieldErrorMessage.getText().
                    then(result => {return result})).toEqual(data.msg);*/
                expect(authorizationPage.isFieldErrorVisible(data.msg)).toBeTruthy();
            }

            expect(authorizationPage.isUserAuthenticated()).toBeFalsy();
        });
    });

});
