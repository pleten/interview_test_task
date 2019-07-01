import { $, $$, by, element, ElementFinder, browser, ExpectedConditions } from "protractor";
import { commonMethods } from "./commonMethods";
import { Driver } from "selenium-webdriver/chrome";

class HomePage {
    private cheapestFeaturedFilterButton = $("div.filter-item>a.ng-scope");
    private personalFilter = element.all(by.xpath("//*/div[@class='filter-item']/a[contains(@ng-class, 'low')]")).first();
    private businessFilter = element.all(by.xpath("//*/div[@class='filter-item']/a[contains(@ng-class, \"'high'\")]")).first();
    private oneDomainFilter = element.all(by.xpath("//*/div[@class='filter-item ng-scope']/a[contains(@ng-class, 'key')]")).first();

    public async applyPersonalFilter() {
        await commonMethods.hoverTheMouseOverElement(this.personalFilter);
        await this.personalFilter.click();
    }

    public async applyBusinessFilter() {
        await commonMethods.hoverTheMouseOverElement(this.businessFilter);
        await this.businessFilter.click();
    }

    public async applyOneDomainFilter() {
        await commonMethods.hoverTheMouseOverElement(this.oneDomainFilter);
        await this.oneDomainFilter.click();
    }

    public async applyCheapestFilter() {
        await commonMethods.hoverTheMouseOverElement(this.cheapestFeaturedFilterButton);
        await this.cheapestFeaturedFilterButton.click();
    }

    public async getCheapestFeaturedButtonTitle() {
        await commonMethods.hoverTheMouseOverElement(this.cheapestFeaturedFilterButton);
        const title: string = await $("div.filter-item>a.ng-scope").getText();
        return title.toLowerCase().trim();
    }

    public async getAllCertificatesPrices() {
        const pricesContainers: ElementFinder[] = await $$("div.ssl-content>div.ssl-price-box>price.lg-price");
        const prices: any[] = [];

        for (const container of pricesContainers) {
            await commonMethods.hoverTheMouseOverElement(container);
            const value = await container.getAttribute("value");
            prices.push(parseInt(value));
        }
        return prices;
    }

    public async getAttributesOfAllCertificates() {
        const attributesContainers: ElementFinder[] = await $$("div.ssl-content>div.desc-box");
        const attributesList: any[] = [];

        for (const container of attributesContainers) {
            await commonMethods.hoverTheMouseOverElement(container);
            const textContainers = await container.$$("p.text");
            const texts: any[] = [];
            for (const textContainer of textContainers) {
                const attributeValue = await textContainer.getText();
                texts.push(attributeValue);
            }

            attributesList.push(texts);
        }
        return attributesList;
    }
}

export const onHomePage = new HomePage();