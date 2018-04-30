const commonHelper = require('./../../helpers/common.helper.js');
const HomePage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.txtPersonal = element.all(by.css('.desc-box p:nth-child(4)'));
    this.txtDomainCount = element.all(by.css('.desc-box p:nth-child(2)'));
    this.txtPrices = element.all(by.css('.ssl-price-box price.lg-price'));
    this.txtRating = element.all(by.css('.rating'));

    this.btnPersonal = $('a[ng-click*="low"]');
    this.btnMultiDomain = $('[ng-repeat*="prodListCtrl.types"]:nth-child(2)');
    this.btnOrderByCheapest = $('[ng-click*="orderBy(\'prices.max.cert\', false)"]');
    this.btnOrderByFetured = $('[ng-click*="orderBy(\'sort\', false)"]');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickPersonalFilter = function () {
        commonHelper.waitUntilElementVisible(this.btnPersonal);
        this.btnPersonal.click();
    };

    this.clickMultiDomainFilter = function () {
        commonHelper.waitUntilElementVisible(this.btnMultiDomain);
        this.btnMultiDomain.click();
    };

    this.sortByCheapest = function () {
        commonHelper.waitUntilElementVisible(this.btnOrderByCheapest);
        this.btnOrderByCheapest.click();
    };

    this.sortByFeatured = function () {
        commonHelper.waitUntilElementVisible(this.btnOrderByFetured);
        this.btnOrderByFetured.click();
    };

    this.isOnlyPersonalDisplayed = async function () {
        return await this.isFilteredSslDisplays(this.txtPersonal, 'Domain validation');
    };

    this.isOnlyMultiDomainDisplayed = async function () {
        return await this.isFilteredSslDisplays(this.txtDomainCount, '3-100 domains');
    };

    this.getRatings = async function () {
        const ratings = await this.txtRating;
        const ratingsLength = ratings.length;
        let ratingsResult = [];
        let i = 0;

        for (i; i < ratingsLength; i++) {
            let str = await ratings[i].getAttribute('class');
            let rating = str.substr(13).replace(/_/g, "");
            ratingsResult.push(parseInt(rating, 10));
        }
        return ratingsResult;
    };

    this.getRatingsAndSort = async function () {
        global.sortedRatings = await this.getRatings();
        commonHelper.sortArray(sortedRatings);
    };

    this.isSortedByRating = async function () {
        const ratings = await this.getRatings();
        const sortedRatingsRev = sortedRatings.reverse();
        console.log(`ratings: ${ratings}`);
        console.log(`sortedRatings: ${sortedRatingsRev}`);
        return commonHelper.compareItems(ratings, sortedRatingsRev);
    };

    this.isFilteredSslDisplays = async function (element, value) {
        await browser.sleep(1000);
        const ssl = await element;
        const sslCount = ssl.length;
        let result;
        let i = 0;

        for (i; i < sslCount; i++) {
            let text = await ssl[i].getText();
            if (text.indexOf(value) !== -1) {
                result = true;
            } else {
                result = false;
            }
        }
        return result;
    };

    this.getSslPrices = async function () {
        const priceArr = await this.txtPrices;
        const priceArrLength = priceArr.length;
        let prices = [];
        let i = 0;

        for (i; i < priceArrLength; i++) {
            let price = await priceArr[i].getAttribute('value');
            prices.push(parseInt(price, 10));
        }
        return prices;
    };

    this.getPricesAndSort = async function () {
        global.sortedPrices = await this.getSslPrices();
        commonHelper.sortArray(sortedPrices);
    };

    this.isSortedByPrice = async function () {
        const prices = await this.getSslPrices();
        console.log(`sortedPrices: ${sortedPrices}`);
        console.log(`prices: ${prices}`);
        return commonHelper.compareItems(prices, sortedPrices);
    };
};

module.exports = HomePage;
