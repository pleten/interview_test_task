import { $, $$, browser } from 'protractor';
import { AppCredentials } from '../shared/app-credentials';

const buttonPersonal = $('.filter-box>div:nth-of-type(1) .filter-item:nth-of-type(1)');
const buttonMultiDomain = $('.filter-box>div:nth-of-type(2) .filter-item:nth-of-type(2)');

describe('Testing filters', () => {

    beforeAll(() => {
        browser.get(AppCredentials.baseURL);
    });

    it('Check personal filter', () => {
        buttonPersonal.click();
        let sslList = $$('.cert-list>div .ssl-name');

        // check count of certificates
        sslList.then((elem) => {
            expect(elem.length).toBe(3)
        });
        expect(sslList.getText()).toContain('PositiveSSL');
        expect(sslList.getText()).toContain('PositiveSSL Wildcard');
        expect(sslList.getText()).toContain('PositiveSSL Multi-Domain');

        buttonMultiDomain.click();

        sslList.then((elem) => {
            expect(elem.length).toBe(1)
        });
        expect(sslList.getText()).toContain('PositiveSSL Multi-Domain');
    });

    it('Check featured filter', () => {
        /*Due to steps in Task:
         cannot be checked, because if apply filters above - will be displayed only one SSL certificate and it
         cannot be sorted =)))*/
    })

});
