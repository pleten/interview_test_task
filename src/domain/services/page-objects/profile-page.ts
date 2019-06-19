import {PageObject} from "./page-object";
import {UserProfile} from "../../model/entities/user-profile";
import {$, browser, ExpectedConditions} from "protractor";

export class ProfilePage extends PageObject {
    constructor(url: string = 'https://www.ssls.com/user/profile') {
        super(url);
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async isOpened(): Promise<boolean> {
        try {
            browser.wait(ExpectedConditions.presenceOf($('h1')), 5000);

            return true;
        } catch (e) {
            return false;
        }
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async getProfileData(): Promise<UserProfile> {
        return {
            name: await $('[name="form"] > div:nth-child(1) > .description').getText(),
            email: await $('[name="form"] > div:nth-child(2) > .description').getText(),
            phone: await $('[name="form"] > div:nth-child(4) > .description').getText(),
            address: await $('[name="form"] > div:nth-child(5) > .description').getText(),
            supportPin: await $('[name="form"] > div:nth-child(6) > .description').getText(),
            newsletter: (await $('[name="form"] > div:nth-child(7) > .description > button')
                .getAttribute('class')) === 'toggle-btn.on'
        };
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async isPasswordFieldEmpty(): Promise<boolean> {
        return (await $('[name="form"] > div:nth-child(3) > .description').getText()) === '';
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async updateSupportPin(): Promise<void> {
        await $('[name="supportPin"]').click();

        await browser.wait(ExpectedConditions
            .visibilityOf($('[name="form"] > div:nth-child(5) > .description')), 5000,
            'Address value is not visible.');
    }
}