import { MainPage } from "../pages/main_page.po"

describe('Home page. Filters.', () => {

    let mainPage = new MainPage();

    beforeAll(() => mainPage.navigateTo());

    it('Personal filter', () => {
        mainPage.personalButtonFilter.click();

        expect(mainPage.sslSertificatesList.count()).toEqual(3);
        expect(mainPage.sslSertificatesList.first().getText()).toContain('PositiveSSL');
        expect(mainPage.sslSertificatesList.get(1).getText()).toContain('Multi-Domain');
        expect(mainPage.sslSertificatesList.last().getText()).toContain('Wildcard');
    });

    it('Personal + Multi-Domain filter', () => {
        mainPage.multiDomainButtonFiltr.click();
        expect(mainPage.sslSertificatesList.count()).toEqual(1);
        expect(mainPage.sslSertificatesList.first().getText()).toEqual('PositiveSSL Multi-Domain\n' +
            'HOT\n' +
            '$25.98/YR & UP\n' +
            'Comodo\n' +
            '3-100 domains\n' +
            'www.site.com or site.com\n' +
            'Domain validation\n' +
            'Low assurance\n' +
            'To comparison');

        mainPage.personalButtonFilter.click();
        mainPage.multiDomainButtonFiltr.click();
    });

    it('Cheapest/Featured filter', () => {
        let priceListArr: Array<number> = [];
        expect(mainPage.cheapestFeaturedButton.getText()).toEqual('CHEAPEST');

        mainPage.priceList.each((priceElement) => {
            priceElement.getText().then(text => {
                let number = parseInt(mainPage.substringPrice(text));
                return priceListArr.push(number); //creating array of current prices
            });
        }).then(() => {

            let priceListArrSorted = priceListArr.sort((a, b) => a - b); //sorting from min to max

            mainPage.cheapestFeaturedButton.click();
            mainPage.priceList.first().getText().then((firstPrice) => {
                expect(mainPage.substringPrice(firstPrice)).toEqual(priceListArrSorted[0].toString());
            });
            mainPage.priceList.last().getText().then((lastPrice) => {
                expect(mainPage.substringPrice(lastPrice)).toEqual(priceListArrSorted[priceListArrSorted.length - 1].toString());
            });
        });
        /*According to the task in the test, we need to perform a sorting,
          but since only one certificate is displayed when you click on two filters (Personal filter, Multi-Domain filter),
          the check is performed without applying this filters!*/
    });
});