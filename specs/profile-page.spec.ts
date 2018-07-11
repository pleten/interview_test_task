import {HomePage} from "../model/page-objects/home.page";
import {AcceptanceHelpers as I} from "../helpers/acceptance.helpers"
import {LoginPage} from "../model/page-objects/login.page";
import {ProfilePage} from "../model/page-objects/profile.page";

let homePage = new HomePage();
let loginPage = new LoginPage();
let profilePage = new ProfilePage();

let name = "Vasya Pupkin";
let email = "ssls.automation+5@gmail.com";
let phone = "+380 57123456789";
let address = "Diagon alley 2, Misto, Uryupinsk 612120, Ukraine";

describe('profile page testing', function () {

    beforeEach(async () => {
        await I.open(homePage.url);
        await I.goTo("Log in");
        await loginPage.login("user");
        await I.goTo("View profile");
    });

    afterEach(async () => {
        await I.deleteCache();
    });

    it('client area testing', async function () {
        await profilePage.setName("Vasya", "Pupkin");
        await profilePage.setEmail("ssls.automation+5@gmail.com", "123456");
        await profilePage.setPassword("123456", "123456");
        await profilePage.setPhone("+380", "57123456789");
        await profilePage.setAddress("Diagon alley 2", "Misto", "Uryupinsk", "612120", "Ukraine");

        await I.goTo("Log out");
        await I.goTo("Log in");
        await loginPage.login("user");
        await I.goTo("View profile");

        let currentName = await profilePage.returnDescription("Name");
        let currentEmail = await profilePage.returnDescription("Email");
        let currentPhone = await profilePage.returnDescription("Phone");
        let currentAddress = await profilePage.returnDescription("Address");

        await I.compareStrings(currentName, name, false);
        await I.compareStrings(currentEmail, email, false);
        await I.compareStrings(currentPhone, phone, false);
        await I.compareStrings(currentAddress, address, false);
    });

    it('refresh support pin', async function () {
        let oldSupportPin = await profilePage.getSupportPin();
        let newSupportPin = await profilePage.refreshSupportPin();

        await I.compareStrings(oldSupportPin, newSupportPin, true);
    });
});