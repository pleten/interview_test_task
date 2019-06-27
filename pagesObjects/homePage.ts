import { $, $$, by, element, ElementFinder } from "protractor";

class HomePage {
    private cheapestFeaturedFilterButton = $("div.filter-item>a.ng-scope");
    private personalFilter = element.all(by.xpath("//*/div[@class='filter-item']/a[contains(@ng-class, 'low')]"));
    private businessFilter = element.all(by.xpath("//*/div[@class='filter-item']/a[contains(@ng-class, \"'high'\")]"));
    private oneDomainFilter = element.all(by.xpath("//*/div[@class='filter-item ng-scope']/a[contains(@ng-class, 'key')]")).first();

    public async applyPersonalFilter() {
        await this.personalFilter.click();
    }

    public async applyBusinessFilter() {
        await this.businessFilter.click();
    }

    public async applyOneDomainFilter() {
        await this.oneDomainFilter.click();
    }

    public async applyCheapestFilter() {
        await this.cheapestFeaturedFilterButton.click();
    }

    public async getCheapestFeaturedButtonTitle() {
        const title: string = await this.cheapestFeaturedFilterButton.$("span").getText();
        return title.trim();
    }

    public async getAllCertificatesPrices() {
        const pricesContainers: ElementFinder[] = await $$("div.ssl-content>div.ssl-price-box>price.lg-price");
        const prices: any[] = [];

        for (const container of pricesContainers) {
            const value = await container.getAttribute("value");
            prices.push(parseInt(value));
        }
        return prices;
    }

    public async getAttributesOfAllCertificates() {
        const attributesContainers: ElementFinder[] = await $$("div.ssl-content>div.desc-box");
        const attributesList: any[] = [];

        for (const container of attributesContainers) {
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