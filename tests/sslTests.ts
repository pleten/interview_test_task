import { HomePage } from '../src/pages/HomePage';
import { Browser } from '../src/Browser';
import { assert } from 'chai';
import { config } from '../config';
import { AuthorizationPage } from '../src/pages/AuthorizationPage';

describe('QA automation Test', () => {
  let homePage: HomePage;

  before(() => {
    Browser.configure(config.browser);
  });

  beforeEach(async () => {
    homePage = new HomePage(new Browser(config.browser));
  });

  describe('1. Authorization page (Welcome back!)', () => {
    it('should login', async () => {

      const username: string = 'ssls.automation+5@gmail.com';
      const password: string = '123456';

      await homePage.open();

      // check home page is opened
      assert.isTrue(await homePage.isOpened(), 'Home page is not opened');

      const authorizationPage = await homePage.openAutorizationPage();

      // check authorization page is opened
      assert.isTrue(await authorizationPage.isOpened(), 'Authorization page is not opened');

      await authorizationPage.showPassword();

      // check show password feature
      assert.isTrue(await authorizationPage.isPasswordShown(),
                    'Show password button does not work');

      await authorizationPage.login(username, password);

      // check user login
      assert.isTrue(await homePage.isUserLoggerIn(username), 'User is not logged in');
    });
  });

  describe('2. Authorization page. Not registered user', () => {
    it('should not login', async () => {
      const username: string = 'sometestuser@gmail.com';
      const password: string = '123456';

      await homePage.open();

      // check home page is opened
      assert.isTrue(await homePage.isOpened(), 'Home page is not opened');

      const authorizationPage = await homePage.openAutorizationPage();

      // check authorization page is opened
      assert.isTrue(await authorizationPage.isOpened(), 'Authorization page is not opened');

      await authorizationPage.showPassword();

      // check show password feature
      assert.isTrue(await authorizationPage.isPasswordShown(),
                    'Show password button does not work');

      await authorizationPage.login(username, password);

      // check login validation
      assert.equal(await authorizationPage.getErrorText(),
                   'Uh oh! Email or password is incorrect', 'Error pop-up in not shown');
    });
  });

  describe('3. Authorization page. Invalid email', () => {
    it('should show error message', async () => {
      const username: string = 'test@@test.com';
      const password: string = '123456';

      await homePage.open();

      // check home page is opened
      assert.isTrue(await homePage.isOpened(), 'Home page is not opened');

      const authorizationPage = await homePage.openAutorizationPage();

      // check authorization page is opened
      assert.isTrue(await authorizationPage.isOpened(), 'Authorization page is not opened');

      await authorizationPage.showPassword();

      // check show password feature
      assert.isTrue(await authorizationPage.isPasswordShown(),
                    'Show password button does not work');

      await authorizationPage.login(username, password);

      // check tooltip
      assert.equal(await authorizationPage.getEmailTooltipText(),
                   'Uh oh! This isn’t an email', 'Email tooltip in not shown');
    });
  });

  describe('4. Authorization page. Empty fields', () => {
    it('shoud show tooltips', async () => {
      const username: string = '';
      const password: string = '';

      await homePage.open();

      // check home page is opened
      assert.isTrue(await homePage.isOpened(), 'Home page is not opened');

      const authorizationPage = await homePage.openAutorizationPage();

      // check authorization page is opened
      assert.isTrue(await authorizationPage.isOpened(), 'Authorization page is not opened');

      await authorizationPage.login(username, password);

      // check tooltips
      assert.equal(await authorizationPage.getEmailTooltipText(),
                   'Oops, please enter your email', 'Email tooltip in not shown');
      assert.equal(await authorizationPage.getPasswordTooltipText(),
                   'Looks like you’ve missed this one', 'Password tooltip in not shown');
    });
  });

  describe('5. Log Out', () => {
    let authorizationPage: AuthorizationPage;

    beforeEach(async () => {
      const username: string = 'ssls.automation+5@gmail.com';
      const password: string = '123456';

      await homePage.open();
      authorizationPage = await homePage.openAutorizationPage();
      await authorizationPage.login(username, password);
    });

    it('should log out', async () => {
      await homePage.logout();

      // check logout
      assert.isTrue(await homePage.isOpened(), 'User is not logged out');
      assert.isTrue(await authorizationPage.isOpened(), 'Authorization page is not opened');
    });
  });

  describe('6. My profile page. Client area', () => {
    const username: string = 'ssls.automation+5@gmail.com';
    const password: string = '123456';
    let expectedName: string;
    let expectedPassword: string;
    let expectedEmail: string;
    let expectedPhone: string;
    let expectedAddress: string;
    let expectedSupportPin: string;
    let expectedNewsLetter: string;

    beforeEach(async () => {
      await homePage.open();
      const authorizationPage = await homePage.openAutorizationPage();
      await authorizationPage.login(username, password);
      const profilePage = await homePage.openProfilePage();

      expectedName = await profilePage.getFieldValue('name');
      expectedPassword = await profilePage.getFieldValue('password');
      expectedEmail = await profilePage.getFieldValue('email');
      expectedPhone = await profilePage.getFieldValue('phone');
      expectedAddress = await profilePage.getFieldValue('address');
      expectedSupportPin = await profilePage.getFieldValue('pin');
      expectedNewsLetter = await profilePage.getFieldValue('newsletter');

      await homePage.logout();
    });

    it('should open user page', async () => {
      const authorizationPage = await homePage.openAutorizationPage();
      await authorizationPage.login(username, password);
      const profilePage = await homePage.openProfilePage();

      // check profile page
      assert.isTrue(await profilePage.isOpened(), 'User page is not opened');

      const name = await profilePage.getFieldValue('name');
      const pass = await profilePage.getFieldValue('password');
      const email = await profilePage.getFieldValue('email');
      const phone = await profilePage.getFieldValue('phone');
      const address = await profilePage.getFieldValue('address');
      const supportPin = await profilePage.getFieldValue('pin');
      const newsLetter = await profilePage.getFieldValue('newsletter');

      // check fields
      assert.equal(name, expectedName, 'name check fails');
      assert.equal(pass, expectedPassword, 'password check fails');
      assert.equal(email, expectedEmail, 'email check fails');
      assert.equal(phone, expectedPhone, 'phone check fails');
      assert.equal(address, expectedAddress, 'address check fails');
      assert.equal(supportPin, expectedSupportPin, 'pin check fails');
      assert.equal(newsLetter, expectedNewsLetter, 'newsletter check fails');
    });
  });

  describe('7. My profile page. Refresh support pin', () => {
    beforeEach(async () => {
      const username: string = 'ssls.automation+5@gmail.com';
      const password: string = '123456';

      await homePage.open();
      const authorizationPage = await homePage.openAutorizationPage();
      await authorizationPage.login(username, password);
    });

    it('should refresh support pin', async () => {
      const profilePage = await homePage.openProfilePage();
      const oldPin = await profilePage.getSupportPinValue();
      await profilePage.refreshSupportPin();
      const newPin = await profilePage.getSupportPinValue();

      // check new and old pin
      assert.notEqual(oldPin, newPin, 'Support pin is not changed');
    });
  });

  describe('8. Home page. Filters', () => {
    it('should apply filters', async () => {
      let filter = 'Personal';

      await homePage.open();
      await homePage.filterSslCertificates(filter);

      // check if personal filter applied
      assert.isTrue(await homePage.isPersonalFilterApplied());

      filter = 'multi-domain';
      await homePage.filterSslCertificates(filter);

      // check if multi domain filter applied
      assert.isTrue(await homePage.isPersonalFilterApplied()
        && await homePage.isMultiDomainFilterApplied());

      await homePage.clearAllFilter();

      // sort cheapest
      await homePage.sort();

      // check if ssl sorted by cheapest
      assert.isTrue(await homePage.isSslSortedByCheapest());

      // sort featured
      await homePage.sort();

      // check if ssl sorted by featured
      assert.isTrue(await homePage.isSslSortedByFeatured());
    });
  });

  describe('4. Authorization page. Empty fields', () => {
  });

  afterEach(async () => {
    await homePage.close();
  });
});
