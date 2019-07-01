import {authorization} from "../utils/authorization";
import {Page} from "../objects/pages";
import {Type} from "../types";
import {PAGE_TITLES, USER_OPTIONS} from "../assets";

describe("My profile page", () => {
    const userProfilePage = new Page.UserProfile();
    const homePage = new Page.Home();

    describe("Client area", () => {
        let currentUserProfile: Type.UserProfile;

        beforeAll(async () => {
            await authorization.login();
            await userProfilePage.open();
            currentUserProfile = await userProfilePage.getCurrentProfile();
            await authorization.logout();
            await authorization.login();
        });

        it("should load user profile page on selecting [view profile] option of [user dropdown]", async () => {
            await homePage.header.userDropdown.getOption(USER_OPTIONS.VIEW_PROFILE).select();

            await expect(userProfilePage.pageTitle).toHaveText(PAGE_TITLES.USER_PROFILE);
        });

        it("should display values of current user profile", async () => {
            await expect(userProfilePage.nameItem.description).toHaveText(currentUserProfile.name);
            await expect(userProfilePage.emailItem.description).toHaveText(currentUserProfile.email);
            await expect(userProfilePage.passwordItem.description).not.toHaveText("");
            await expect(userProfilePage.phoneItem.description).toHaveText(currentUserProfile.phone);
            await expect(userProfilePage.addressItem.description).toHaveText(currentUserProfile.address);
            await expect(userProfilePage.supportPinItem.description).toHaveText(currentUserProfile.supportPin);
            await expect(userProfilePage.newsletterItem.turnOnCheckbox)
                .toHaveSelectedValue(currentUserProfile.newsletter);
        });
    });

    describe("Refresh support pin", () => {
        let initialSupportPin: string;

        beforeAll(async () => {
            await authorization.login();
            await homePage.header.userDropdown.getOption(USER_OPTIONS.VIEW_PROFILE).select();
            initialSupportPin = await userProfilePage.supportPinItem.description.getText();
        });

        it("should refresh support pin value on clicking [refresh] button of [support pin] item", async () => {
            await userProfilePage.supportPinItem.refreshButton.click();

            await expect(userProfilePage.supportPinItem.description).not.toHaveText(initialSupportPin);
            await expect(userProfilePage.supportPinItem.description).not.toHaveText("");
        });
    });
});
