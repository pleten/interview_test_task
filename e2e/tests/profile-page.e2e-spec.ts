import { $, browser } from 'protractor';
import { LoginPage } from '../shared/login-page.po';
import { HeaderPage } from '../shared/header-page.po';
import { DataProvider } from '../data/data-provider';

const using = require('jasmine-data-provider');

describe('My profile page', () => {

    beforeAll(() => {
        LoginPage.login();
        HeaderPage.goToProfilePage();
    });

    afterAll(() => {
        LoginPage.logout();
    });

    using(DataProvider.profilePageElements, (data: any, description: any) => {
        it('Check info' + description + ' on profile page', () => {
            expect(data.element().getText()).toEqual(data.expectedResult);
        });
    });

    it('Refresh support pin', () => {
        const valueSupportPin = $('.inline-panel div:nth-of-type(6) .description');
        const valuePrevious = (valueSupportPin.getText());
        const buttonChangePin = $('button[name="supportPin"]');

        buttonChangePin.click();
        const valueLast = (valueSupportPin.getText());

        expect(valuePrevious).not.toBe(valueLast);
    });
});
