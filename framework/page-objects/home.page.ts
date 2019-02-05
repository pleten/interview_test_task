import { $, browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { Environment } from '../environment';
import { Description } from '../models/description.model';
import { Price } from '../models/price.model';
import { Promo } from '../models/promo.model';
import { LoginPage } from './login.page';
import { UserProfileDropdown } from './user.profile.dropdown';

export class HomePage {
    private readonly homePageBlock: ElementFinder = $('.cert-list-page.page-container');
    private readonly headerBlock: ElementFinder = $('.header.clear');
    private readonly certificateListBlock: ElementFinder = $('.cert-list');
    certificateList: ElementArrayFinder = this.certificateListBlock.$$('.ssl-item');
    private readonly userBlock: ElementFinder = this.headerBlock.$('.user-box');
    private readonly userProfileElement: ElementFinder = this.userBlock.$('.log-box');
    private readonly loginButton: ElementFinder = this.userProfileElement.$('.btn.flat-dark.ng-scope');
    private readonly userProfileDropdown: ElementFinder = this.userProfileElement.$('.dropdown-btn');
    private readonly featuredSortingButton: ElementFinder = element(by.css(`[ng-click="prodListCtrl.orderBy('sort', false)"]`));

    async getInstance(): Promise<void> {
        await browser.get(Environment.baseUrl, 30000);
    }

    async clickLoginButton(): Promise<LoginPage> {
        await this.loginButton.click();
        return new LoginPage();
    }

    async clickCertsButton(): Promise<void> {
        await $('.nav')
            .element(by.cssContainingText('.btn.flat-dark', 'Certs'))
            .click();
    }

    async waitForLoginButtonToBeClickable(): Promise<void> {
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.elementToBeClickable(this.loginButton), 10000);
    }

    async isOpened(): Promise<boolean> {
        return this.homePageBlock.isPresent();
    }

    async getUserProfileName(): Promise<string> {
        return this.userProfileElement.getText();
    }

    async isUserProfileDropdownPresent(): Promise<boolean> {
        return this.userProfileDropdown.isPresent();
    }

    async openUserProfileDropdown(): Promise<UserProfileDropdown> {
        await this.userProfileDropdown.click();
        return new UserProfileDropdown();
    }

    async clickFilterButtonByName(name: string): Promise<void> {
        await element(by.cssContainingText('.btn.block.round.control', name)).click();
    }

    async clickCheapestSortingTypeButton(): Promise<void> {
        return element(by.cssContainingText('.btn.block.round.control', 'Cheapest')).click();
    }

    async clickFeaturedSortingTypeButton(): Promise<void> {
        await this.featuredSortingButton.click();
    }

    async getCertRatingFromCertElement(certificateElement: ElementFinder): Promise<number> {
        const starsString = (await certificateElement
            .$('.ssl-title')
            .$('.rating')
            .getAttribute('class'))
            .split('stars-')[1]
            .split('_');
        return parseFloat(`${starsString[0]}.${starsString[1]}`);
    }

    async getCertNameFromCertElement(certificateElement: ElementFinder): Promise<string> {
        return certificateElement
            .$('.ssl-title')
            .$('.ssl-name')
            .getText();
    }

    async getCertCurrentPriceFromCertElement(certificateElement: ElementFinder): Promise<Price> {
        return this.getPriceFromPriceBox(certificateElement.$('.ssl-price-box').$('.lg-price'));
    }

    async getCertOldPriceFromCertElement(certificateElement: ElementFinder): Promise<Price> {
        return this.getPriceFromPriceBox(certificateElement.$('.ssl-price-box').$('.base-price'));
    }

    async getCertPromoFromCertElement(certificateElement: ElementFinder): Promise<Promo> {
        return new Promo(
            await certificateElement
                .$('.promo-box')
                .$('.promo.hot')
                .isPresent(),
            await certificateElement
                .$('.promo-box')
                .$('.promo.sale')
                .isPresent(),
        );
    }

    async getCertDescriptionFromCertElement(certificateElement: ElementFinder): Promise<Description> {
        const description = (await certificateElement
            .$('.ssl-content')
            .$('.desc-box')
            .getText()).split('\n');
        return new Description(description[0], description[1], description[2], description[3], description[4]);
    }

    async getPriceFromPriceBox(certPriceBox: ElementFinder): Promise<Price> {
        return new Price(
            parseFloat(`${await certPriceBox.$('.integer').getText()}${await certPriceBox.$('.cent').getText()}`),
            await certPriceBox.$('.currency-icon').getText(),
            (await certPriceBox.$('.units').getText()).split('/')[1],
        );
    }
}
