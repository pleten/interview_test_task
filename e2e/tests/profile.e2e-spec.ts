import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { Notification, ProfilePage } from '../pages';
import { browser } from 'protractor';
import { validUser } from '../data';

describe('Profile page', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let noty: Notification;
  let profilePage: ProfilePage;

  let expectedProfileData;

  beforeAll(async() => {
    loginPage = new LoginPage();
    homePage = new HomePage();
    noty = new Notification();
    profilePage = new ProfilePage();

    await loginPage.open();
    await loginPage.loginUser(validUser);
    await homePage.gotoProfilePage();
    expectedProfileData = await profilePage.getProfileData();

    await browser.driver.manage().deleteAllCookies();
  });

  beforeEach(async () => {
    await loginPage.open();
    await loginPage.loginUser(validUser);
    await homePage.gotoProfilePage();
  });

  afterEach(async () => {
    // clear cookies to force logout
    await browser.driver.manage().deleteAllCookies();
  });

  it('Check profile data', async () => {
    const userProfileData = await profilePage.getProfileData();

    return expect(userProfileData).toEqual(expectedProfileData);
  });

  it('Refresh Pin', async () => {
    const pinBefore = await profilePage.getPropValue(profilePage.pin);
    await profilePage.refreshPin();
    const pinAfter = await profilePage.getPropValue(profilePage.pin);

    expect(pinAfter).not.toEqual(pinBefore);
  });
});
