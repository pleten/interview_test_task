//

let LoginPage = require('./loginPage.pageObject');
const protractor = require("protractor");

describe('User test scenarios', function () {

    let loginPage = new LoginPage();
    let ec = protractor.ExpectedConditions;
    let email = browser.params.login.email;
    let password = browser.params.login.password;

    let profile_data = [];
    let profile_data_to_compare = [];
    let profile_fields = element.all(by.css('form[name*=\'form\'] > div'));
    let profile_field_name = '.terms > span';
    let profile_field_value = '.description > span.text.ng-binding';
    let profile_newsletter_toggle = '.description > button.toggle-btn';

    let profile_edit_button = 'button.btn.square';
    let profile_edit_box = '.edit-box';
    let profile_edit_save = '.description div > button:nth-of-type(2)';
    let profile_edit_pass_confirm = '[ng-model*=\'user.passwordConfirm\']';
    let profile_edit_pass_new = '[ng-model*=\'user.password\']:not([ng-model*=\'user.passwordConfirm\'])';

    it('my profile page - save and gathered required values', function() {
        browser.get('/');
        loginPage.open_profile_page(email,password);
        // Saving existing info
        profile_fields.each(function (elm) {
            elm.$(profile_field_name).getText().then(function (name) {
                if(name === 'Support pin' || name === 'Newsletter'){
                    // do nothing
                } else if (name === 'Email'){
                    elm.$(profile_edit_button).click();
                    elm.$(profile_edit_box).$(profile_edit_pass_confirm).clear();
                    elm.$(profile_edit_box).$(profile_edit_pass_confirm).sendKeys(password);
                    elm.$(profile_edit_box).$(profile_edit_save).click();
                    browser.wait(ec.invisibilityOf(elm.$(profile_edit_box).$(profile_edit_save)), 5 * 1000);
                } else if (name === 'Password'){
                    elm.$(profile_edit_button).click();
                    elm.$(profile_edit_box).$(profile_edit_pass_confirm).clear();
                    elm.$(profile_edit_box).$(profile_edit_pass_confirm).sendKeys(password);
                    elm.$(profile_edit_box).$(profile_edit_pass_new).clear();
                    elm.$(profile_edit_box).$(profile_edit_pass_new).sendKeys(password);
                    elm.$(profile_edit_box).$(profile_edit_save).click();
                    browser.wait(ec.invisibilityOf(elm.$(profile_edit_box).$(profile_edit_save)), 5 * 1000);
                } else {
                    elm.$(profile_edit_button).click();
                    elm.$(profile_edit_box).$(profile_edit_save).click();
                    browser.wait(ec.invisibilityOf(elm.$(profile_edit_box).$(profile_edit_save)), 5 * 1000);
                }
            })
        });

        // Dta gathering
        browser.refresh();
        profile_data = gather_data(profile_data);
        loginPage.logout();
    });

    it('my profile page contains all required fields, data is gathered after re-login', function() {
        expect(profile_data.length).toBeGreaterThan(0,'Profile data array is empty.');
        loginPage.open_profile_page(email,password);

        profile_data_to_compare = gather_data(profile_data_to_compare);
        loginPage.logout();
    });

    it('my profile page - two data-sets are compared and equal', function() {
        expect(profile_data_to_compare.length).toBeGreaterThan(0,'Profile data after re-login array is empty.');
        expect(profile_data).toEqual(profile_data_to_compare,'Profile data is not the same after re-login.');
    });

    it('my profile page. Refresh support pin should be updated', function() {
        browser.get('/');
        loginPage.open_profile_page(email,password);

        let old_pin = profile_fields.get(5).$(profile_field_value).getText();
        profile_fields.get(5).$(profile_edit_button).click();
        expect(profile_fields.get(5).$(profile_field_value).getText()).not.toEqual(old_pin,'Support pin was not updated.');

        loginPage.logout();
    });

    let homePage = element(by.css('.page-container.cert-list-page'));
    let sort_button = element(by.css('.sort-btn > .filter-item > a'));
    let personal_filter = element(by.xpath('//*[contains(text(), \'Personal\')]'));
    let multi_domain_filter = element(by.xpath('//*[contains(text(), \'multi-domain\')]'));
    let certs_list = element.all(by.css('.cert-list.clear > div'));
    let ssl_rating = '.ssl-title > .rating';
    let ssl_price = '.ssl-content > .ssl-price-box > price:first-of-type';
    let ssl_domain = '.ssl-content > .desc-box > p:nth-of-type(2)';
    let ssl_assurance = '.ssl-content > .desc-box > p:nth-of-type(5)';

    describe('home page. Filters are functioning', function() {
        it('filter functionality works properly',function () {
            browser.get('/');
            expect(homePage.isDisplayed()).toBe(true);

            personal_filter.click();
            certs_list.each(function (elm) {
                let low_assuranse = ec.textToBePresentInElement(elm.$(ssl_assurance),'Low assurance');
                let medium_assuranse = ec.textToBePresentInElement(elm.$(ssl_assurance),'Medium assurance');
                expect(ec.or(low_assuranse,medium_assuranse),'The personal filter was not applied.');
            });

            multi_domain_filter.click();
            certs_list.each(function (elm) {
                let low_assuranse = ec.textToBePresentInElement(elm.$(ssl_assurance),'Low assurance');
                let medium_assuranse = ec.textToBePresentInElement(elm.$(ssl_assurance),'Medium assurance');
                expect(ec.or(low_assuranse,medium_assuranse));
                expect(elm.$(ssl_domain).getText()).toContain('3-100 domains','The multi-domains filter was not applied.');
            });
            personal_filter.click();
            multi_domain_filter.click();
        });

        it('sort functionality works properly',function () {
            // 'Sort by Featured' verification
            // !!! - currently on the web-site sorting by default(rating) is not descending: as expected
            let previous_rating = 5;
            certs_list.each(function (elm) {
                let elm_rating = 0;
                elm.$(ssl_rating).getAttribute('class').then(function (text) {
                    if(text.includes('stars-5_0')){
                        elm_rating = 5;
                    } else if(text.includes('stars-4_0')){
                        elm_rating = 4;
                    } // and so on...
                    expect(elm_rating).toBeLessThanOrEqual(previous_rating,'Expected sort by rating to be descending.');
                    previous_rating = elm_rating;
                });
            });

            // Cheapest items order verification
            let previous_price = 0;
            sort_button.click();
            certs_list.each(function (elm) {
                expect(elm.$(ssl_price).getCssValue()).toBeGreaterThanOrEqual(previous_price,'Expected cheapest sorting to be price-ascending.');
                previous_price = elm.$(ssl_price).getCssValue();
            });
        });
    });

    let gather_data = function (data) {
        browser.wait(ec.elementToBeClickable(profile_fields.first()), 15 * 1000);
        expect(profile_fields.count()).toBeGreaterThanOrEqual(7,'Expected profile fields amount to be 7.');

        profile_fields.each(function (elm) {
            elm.$(profile_field_name).getText().then(function (name) {
                let obj = [];
                // Additional 'if' for the toggle status recognition
                if (name === 'Newsletter') {
                    let newsletter_toggle = false;
                    elm.$(profile_newsletter_toggle).getAttribute('class').then(function (value) {
                        if(value.includes('on')) newsletter_toggle = true;
                    });
                    obj[name] = newsletter_toggle;
                }else {
                    elm.$(profile_field_value).getText().then(function (value) {
                        obj[name] = value;
                    });
                }

                data.push(obj);
            });
        });

        return data;
    }
});