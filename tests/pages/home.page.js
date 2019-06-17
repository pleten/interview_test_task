import Page from './page';
import Wd from '../core/wd';
import {config} from "../config/test-config";

class HomePage extends Page {

	// Page elements
cardDetails() { return '[ng-bind-html="product.excerptDescription"]';}
filterButton(filter) { return `//a[@href="javascript:void(0);"][contains(text(),'${filter}')]`; }
cheapestSortButton() { return `//a[@ng-if="prodListCtrl.filter.orderBy === 'sort'"]`; }
expensiveSortButton() { return `//a[@ng-if="prodListCtrl.filter.orderBy !== 'sort'"]`}

	// others
integerValue() { return '.ssl-content>.ssl-price-box>price.lg-price>.price>.integer'; }
centValue() { return '.ssl-content>.ssl-price-box>price.lg-price>.price>.cent'; }

	// Page actions

    clickOnFilter(filter) {
        Wd.click(this.filterButton(filter));
    }

    getAllTextFromCards() {
        return Wd.getElementsTextArray(this.cardDetails());
    }

    getAllPrices() {
    let price = [];
       let integer = Wd.getElementsTextArray(this.integerValue());
       let cents = Wd.getElementsTextArray(this.centValue());
       for (let i=0;i<integer.length; i++) {
           price[i] = +integer[i].replace('.','')+cents[i];
       }
       return price;
    }

    clickOnSortButton(sort) {
        switch (sort) {
            case 'DESC':
                Wd.click(this.expensiveSortButton());

            case 'ASC':
                Wd.click(this.cheapestSortButton());
        }

    }

    checkSorting(array, sort) {
        let result = [];
        if (sort.toLowerCase() === 'desc') {
            for (let i=0; i<array.length-1; i++) {
                    result.push(+array[i] >= +array[i+1])
                }

        } else if (sort.toLowerCase() === 'asc') {
            for (let i=0; i<array.length-1; i++) {
                    result.push(+array[i] <= +array[i+1]);
                }
        }
        return result.every(el => el === true);

    }

}

export default new HomePage();
