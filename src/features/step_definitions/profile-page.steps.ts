import {TableDefinition, Then, When} from "cucumber";
import {PAGE_OBJECT_TYPES} from "../../domain/services/page-objects/page-object-types";
import {ProfilePage} from "../../domain/services/page-objects/profile-page";
import {CustomWorld} from "../support/world";
import {UserProfile} from "../../domain/model/entities/user-profile";
import {$} from "protractor";
import {expect} from "./common-imports";

When(/^the user opens "View profile" page$/, async function () {
    try {
        const profilePage: ProfilePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.ProfilePage);
        await profilePage.open();
        await profilePage.isOpened();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user stores the values of such the fields in Profile$/,
    async function (datatable: TableDefinition) {
        try {
            const profilePage: ProfilePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.ProfilePage);
            const userProfile: UserProfile = await profilePage.getProfileData();
            CustomWorld.sessionDataMap.set('Profile Data', userProfile);
        } catch (e) {
            throw new Error(e);
        }
    });

When(/^the user clicks the "Update" button in "support pin field" to re-generate a new support pin$/,
    async function () {
    try {
        const profilePage: ProfilePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.ProfilePage);
        const userProfile: UserProfile = await profilePage.getProfileData();
        CustomWorld.sessionDataMap.set('Old support PIN value', userProfile.supportPin);

        await profilePage.updateSupportPin();
    } catch (e) {
        throw new Error(e);
    }

});

Then(/^the opened page "Profile" is displayed$/, async function () {
    const profileTitleAppears: boolean = (await $('h1').getText()).trim() === 'Profile';
    expect(profileTitleAppears).to.equal(true, 'Profile title does not appear');

    const userProfileFormAppears: boolean = await $('[name="form"]').isPresent();
    expect(userProfileFormAppears).to.equal(true, 'User profile form does not appear.');
});

Then(/^the password field is not empty$/, async function () {
    try {
        const profilePage: ProfilePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.ProfilePage);
        const empty: boolean = await profilePage.isPasswordFieldEmpty();

        expect(empty).to.equal(false, 'The password field is empty.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^the profile data are equal to the stored ones$/, async function () {
    try {
        const profilePage: ProfilePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.ProfilePage);
        const actualUserProfile: UserProfile = await profilePage.getProfileData();

        const expectedUserProfile: UserProfile = CustomWorld.sessionDataMap.get('Profile Data');
        expect(actualUserProfile).to.deep.equal(expectedUserProfile, 'User profile data differ.');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^support pin value is updated$/, async function () {
    try {
        const profilePage: ProfilePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.ProfilePage);
        const actualUserProfile: UserProfile = await profilePage.getProfileData();

        const oldSupportPin: string = CustomWorld.sessionDataMap.get('Old support PIN value');
        expect(actualUserProfile.supportPin).not.equal(oldSupportPin,
            'The support PIN value has not been changed.');
    } catch (e) {
        throw new Error(e);
    }
});