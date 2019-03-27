/* eslint-disable no-console */
import BasePage from './BasePage';
import Element from '../components/Element';

export const logInButton = 'div[class="log-box"]>a';
export const personalSSLButton = '//div[@class="filter-item"]/a[contains(text(),"Personal")] ';
export const businessSSLButton = '//div[@class="filter-item"]/a[contains(text(),"Business")] ';
export const oneDomainButton = '//div[@class="filter-item ng-scope"]/a[contains(text(),"one domain")]';
export const sslPlans = 'div[class="desc-box ng-binding"]';
export const filterButtonCheapest = 'span[class="icon icon-sort-alt-up"]';
export const filterButtonFeatured = 'span[class="icon icon-sort-alt-down"]';
export const sslPlansPrices = 'div[class="ssl-content"] span[class="price"] span[class="integer ng-binding"]';


export default class HomePage extends BasePage {

    verifyingSSLPlans(text){
        const sslPlansText = Element.of(sslPlans).getAllValuesTexts();
        sslPlansText.forEach(function(element){
            expect(element).to.include(text);
        });
        return this;
    }

    verifyFilteredByPrice(){
        const sslPlansPricesText = Element.of(sslPlansPrices).getAllValuesTexts();
        const convertedToNumbers = sslPlansPricesText.map(Number);
        const convertedSortedNumbers = convertedToNumbers.sort((a, b) => a - b);
        console.log('only converted numbers', convertedToNumbers);
        console.log('converted and ascending sorted numbers', convertedSortedNumbers);
        expect(convertedToNumbers).to.be.equal(convertedSortedNumbers);
        return this;
    }
}
