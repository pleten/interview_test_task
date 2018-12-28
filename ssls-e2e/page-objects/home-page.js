class HomePage {

    constructor() {
        this.personalDomainsProductBox = element.all(by.css('[class="ssl-item dv-item col-4"]')); // this locator highlights only personal domains
        this.domensCountText = element.all(by.css('.ssl-content [ng-bind-html="product.excerptDescription"] p:nth-child(2)'));
        this.productStars = element.all(by.css('[class*="rating stars"]'));
        this.productsPrice = element.all(by.css('.cert-list.clear price:first-child'));
    }

    filterButtonByName(buttonName) {
        return `//div[contains(@class,"filter-item")]/a[contains(.,"${buttonName}")]`;
    }

    async getRainitgProductsArrayFromPage() {
        let raitingsOfProducts = await this.productStars.getAttribute('class');
        let integerRaitingsOfProducts = [];
        for (let i = 0; i < raitingsOfProducts.length; i++) {
            integerRaitingsOfProducts.push(parseInt(raitingsOfProducts[i].replace(/[^0-9\.]+/g, "")));
        }
        return integerRaitingsOfProducts;
    }

    async getPricesOfProductsArrayFromPage() {
        let pricesOfProducts = await this.productsPrice.getAttribute('value');
        let integerPricesOfProducts = [];
        for (let i = 0; i < pricesOfProducts.length; i++) {
            integerPricesOfProducts.push(parseInt(pricesOfProducts[i]));
        }
        return integerPricesOfProducts;
    }

    sortRaitingByAscending(array) {
        let sortedArray = [];
        sortedArray = array.sort((a, b) => b - a);
        return sortedArray;
    }

    sortRaitingByDescending(array) {
        let sortedArray = [];
        sortedArray = array.sort(function (a, b) {
            return a - b
        });
        return sortedArray;
    }

    getOnlyDomainsNumber(valuesFromFilter) {
        let firstLetters = [];
        for (let i = 0; i < valuesFromFilter.length; i++) {
            firstLetters = parseInt(valuesFromFilter[i].replace(/[^0-9\.]+/g, ""));
        }
        return firstLetters;
    }

    clickFilterButtonByName(buttonName) {
        element(by.xpath(this.filterButtonByName(buttonName))).click();
    }
}

module.exports = new HomePage();
