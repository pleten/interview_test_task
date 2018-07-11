import {LoginPage} from "../model/page-objects/login.page";
import {Header} from "../model/widgets/header.widget";
import {HomePage} from "../model/page-objects/home.page";
import {AcceptanceHelpers as I} from "../helpers/acceptance.helpers"

let loginPage = new LoginPage();
let header = new Header();
let homePage = new HomePage();

describe('smoke testing', function () {

    beforeEach(async () => {
        await I.open(homePage.url);
        await I.seeCurrentUrl(homePage.url);
    });

    afterEach(async () => {
        await I.deleteCache();
    });

    it('log in as registered user', async function () {
        await I.goTo("Log in");

        await I.seeCurrentUrl(loginPage.url);
        await I.seeElement(header.loginButton);

        await loginPage.login("user", "123456", true);

        await I.see(header.profileBoxButton, "ssls.automation+5@gmail.com");

        await I.dontSeeElement(header.loginButton);
        await I.seeElement(header.profileBoxDropdown);
    });

    it('log in as not registered user', async function () {
        await I.goTo("Log in");
        await loginPage.login("invalid12@gmail.com", "654321", true);

        await I.seeInNotification("Uh oh! Email or password is incorrect");
    });

    it('log in with invalid email', async function () {
        await I.goTo("Log in");
        await loginPage.login("test@@test.com", "654321", true);

        await I.seeInTooltipErrors(["Uh oh! This isn’t an email"]);
    });

    it('log in with empty fields', async function () {
        await I.goTo("Log in");
        await loginPage.login("", "");

        await I.seeInTooltipErrors(["Oops, please enter your email", "Looks like you’ve missed this one"]);
    });

    it('log out test', async function () {
        await I.goTo("Log in");
        await loginPage.login("user");

        await I.seeCurrentUrl(homePage.url);

        await I.goTo("Log out");

        await I.seeCurrentUrl(loginPage.url);
    });

    it('testing of personal/multi-domain filters', async function () {
        await homePage.filter("Personal");
        await I.seeNumberOfElements(homePage.sslItem, 5);

        await homePage.filter("multi-domain");
        await I.seeNumberOfElements(homePage.sslItem, 1);
    });
});