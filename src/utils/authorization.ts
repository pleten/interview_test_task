import {Page} from "../objects/pages";
import {Type} from "../types";
import {browser} from "protractor";
import {TEST_USERS} from "../assets";

const authorizationPage = new Page.Authorization();

export const authorization = {
    async login(testUser: Type.TestUser = TEST_USERS.REGISTERED_USER) {
        await authorizationPage.open();
        const userButton = authorizationPage.header.userButton;
        const comeIn = async () => {
            await authorizationPage.loginForm.setUser(testUser);
            await authorizationPage.loginForm.submitButton.click();
        };
        const comeOut = async () => {
            await browser.manage().deleteAllCookies();
            await authorizationPage.open();
        };

        if (await userButton.isPresent()) {
            if (await userButton.getText() === testUser.email) {
                return;
            }
            await comeOut();
        }

        await comeIn();

        if (!(await userButton.isPresent())) {
            throw new Error(`Failed to login (as email ${testUser.email}, password ${testUser.password}).`);
        }
    },
    async logout() {
        await browser.manage().deleteAllCookies();
        await authorizationPage.open();

        const userButtonPresent = await authorizationPage.header.userButton.isPresent();

        if (userButtonPresent) {
            throw new Error(`Failed to logout.`);
        }
    }
};
