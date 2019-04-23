import BasePage from './basePage';

class HomePage extends BasePage {
    constructor(){
        super();
        this.url = '/';
        this.title = 'SSL Certificates—Buy Cheap SSL Certs at $5.66 & Save 52%';
        this.btnLogin = element(by.css('[ui-sref=\'authorize.index\']'));
        this.btnUser = element(by.className('btn btn-s round filled user-btn ng-binding'));
        this.btnOpenUserDropdown = element(by.className('btn btn-s round filled dropdown-btn ng-isolate-scope'));
        this.dropdownUser = element(by.className('dropdown ng-isolate-scope'));
        this.btnViewProfile = element(by.linkText('View profile'));
        this.btnLogout = element(by.buttonText('Log out'));
        this.allProductCards = element.all(by.css('div.ssl-item'));
        this.btnPresonalFilter = element(by.css('[ng-class="{active: prodListCtrl.filter.assurance_types.indexOf(\'low\') !== -1}"]'));
        this.btnBusinessFilter = element(by.css('[ng-class="{active: prodListCtrl.filter.assurance_types.indexOf(\'high\') !== -1}"]'));
        this.btnOneDomainFilter = element(by.css('div.filter-item.ng-scope:nth-child(1) a.btn.block.round.control.ng-binding'));
        this.btnSortCheapestFeatured = element(by.css('div.filter-item > a.btn.block.round.control.ng-scope'));

    }

    logout() {
        this.btnOpenUserDropdown.click();
        return this.btnLogout.click();
    }

    getPrices(){
        var prices = this.allProductCards.$$('div.ssl-price-box price:first-child').getAttribute('value');
        return prices; 
    }

    getAscSortedPrices(){
        var ascSortedPrices = this.allProductCards.$$('div.ssl-price-box price:first-child').getAttribute('value').then(function(values) {
            var sortedValues = values.sort(function(a, b){return a - b});
            return sortedValues;
            }); 
        return ascSortedPrices;
    }

}
export default new HomePage();