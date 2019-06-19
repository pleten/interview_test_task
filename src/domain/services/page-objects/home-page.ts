import {PageObject} from "./page-object";
import {$, $$, browser, by, element, ElementArrayFinder, ElementFinder, ExpectedConditions} from "protractor";
import {ProductCard} from "../../model/entities/product-card";

export class HomePage extends PageObject {
    constructor(url: string = 'https://www.ssls.com/') {
        super(url);
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async clickFilterButtons(names: string[]): Promise<void> {
        const filterButtons: ElementArrayFinder = $$('.filter-box .btn.block.round.control');
        const filterButtonNames: string[] = await filterButtons.map(async fb => {
            const text: string = await fb.getText();

            return text.trim().toUpperCase();
        });

        for (const name of names) {
            const index: number = filterButtonNames.indexOf(name.toUpperCase());
            await browser.executeScript("arguments[0].scrollIntoView();", filterButtons.get(index));
            await filterButtons.get(index).click();
        }
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async clickCheapestButton(): Promise<void> {
        const cheapestButton: ElementFinder =
            element(by.cssContainingText('#certs > div.sort-btn.ng-scope > div > a', 'Cheapest'));
        await browser.executeScript("arguments[0].scrollIntoView();", cheapestButton);

        return cheapestButton.click();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async clickFeaturedButton(): Promise<void> {
        const featuredButton: ElementFinder =
            element(by.cssContainingText('#certs > div.sort-btn.ng-scope > div > a', 'Featured'));
        await browser.executeScript("arguments[0].scrollIntoView();", featuredButton);

        return featuredButton.click();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async getLogInButtonText(): Promise<string> {
        return $('.profile-box > a').getText();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async getProductCards(): Promise<ProductCard[]> {
        const productCards: ProductCard[] = [];

        const names: string[] = await $$('.ssl-name').map(n => n.getText());
        const integerPrice: string[] = await $$('.ssl-content [class="price"] > .integer')
            .map(ip => ip.getText());
        const centPrice: string[] = await $$('.ssl-content [class="price"] > .cent').map(cp => cp.getText());
        const descriptions: Array<string[5]> = await $$('.desc-box')
            .map(async desc => {
                const text = await desc.getAttribute('innerText');

                return text.split('\n\n');
            });

        for (let i = 0; i < names.length; i++) {
            productCards.push({
                name: names[i],
                price: parseInt(`${integerPrice[i]}.${centPrice[i]}`, 10),
                description: descriptions[i]
            });
        }

        return productCards;
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async openUserProfile(): Promise<void> {
        const userProfileItem: ElementFinder = $('[ui-sref="user.profile"]');
        await browser.wait(ExpectedConditions.elementToBeClickable(userProfileItem), 5000);
        await userProfileItem.click();
    }

    public async logOut(): Promise<void> {
        await this.openDropDownMenu();
        await element(by.buttonText('Log out')).click();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async clickLogOutItem(): Promise<void> {
        return element(by.buttonText('Log out')).click();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async openDropDownMenu(): Promise<void> {
        return $('.dropdown-btn').click();
    }

    // tslint:disable-next-line:prefer-function-over-method
    public async clickLogInText(): Promise<void> {
        return $('.log-box > a').click();
    }
}
