import {Given, TableDefinition, Then, When} from "cucumber";
import {HomePage} from "../../domain/services/page-objects/home-page";
import {PAGE_OBJECT_TYPES} from "../../domain/services/page-objects/page-object-types";
import {ProductCard} from "../../domain/model/entities/product-card";
import {expect} from "./common-imports";
import {browser} from "protractor";
import {AuthorizationPage} from "../../domain/services/page-objects/authorization-page";

Given(/^the Home page has been opened$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.open();
        await homePage.isOpened();
    } catch (e) {
        throw new Error(e);
    }
});

Given(/^the user has been logged in$/, async function() {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.open();
        await homePage.isOpened();

        const authorizationPage: AuthorizationPage = this.platformPageMap.get(PAGE_OBJECT_TYPES.AuthorizationPage);
        await authorizationPage.open();

        if (await authorizationPage.isLoggedOut()) {
            await homePage.clickLogInText();
            await authorizationPage.logIn();
        }
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user clicks on filter buttons$/, async function (datatable: TableDefinition) {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.clickFilterButtons(datatable.raw()[0]);
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user clicks "Cheapest" filter button$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.clickCheapestButton();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user clicks on "Featured" filter button to sort products by price$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.clickFeaturedButton();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user logs out$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.logOut();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user clicks on triangle near the "User@email" button$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.openDropDownMenu();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user selects in drop-down menu "View profile"$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.openUserProfile();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user selects the drop-down menu item "Log out"$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.clickLogOutItem();
    } catch (e) {
        throw new Error(e);
    }
});

When(/^the user clicks on the "LOG IN" text$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        await homePage.clickLogInText();
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^list of SSL certificates contains only product cards with domain validation$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        const productCards: ProductCard[] = await homePage.getProductCards();

        for (const productCard of productCards) {
            expect(productCard.description[3]).to.equal('Domain validation', 'No domain validation');
        }
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^list of SSL certificates contains only product cards with Organization Validation and 1 domain$/,
    async function () {
        try {
            const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
            const productCards: ProductCard[] = await homePage.getProductCards();

            // TODO: remove cycle
            for (const productCard of productCards) {
                expect(productCard.description[1]).to.equal('1 domain', 'No 1 domain');
                expect(productCard.description[3]).to.equal('Organization validation',
                    'No organization validation');
            }
        } catch (e) {
            throw new Error(e);
        }
    });

Then(/^list of SSL certificates contains product cards sorted by price ascending$/, async function () {
    try {
        const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
        const productCards: ProductCard[] = await homePage.getProductCards();

        // @ts-ignore
        expect(productCards).to.be.ascendingBy('price');
    } catch (e) {
        throw new Error(e);
    }
});

Then(/^The button "Log in" changes on "User@email" button from the left side in the Header of the page$/,
    async function () {
        try {
            const homePage: HomePage = this.platformPageMap.get(PAGE_OBJECT_TYPES.HomePage);
            const buttonText: string = await homePage.getLogInButtonText();

            expect(buttonText).to.equal(browser.params.regTestUser.email);
        } catch (e) {
            throw new Error(e);
        }
    });