import {BaseComponent} from '../shared/component/base-component';
import {$, $$, ElementArrayFinder, ElementFinder} from 'protractor';

export class HomePagePo extends BaseComponent {
    pageUrl = 'https://www.ssls.com/';
    promoBanner: ElementFinder = $('.ev-promo-banner');
    personalFilter: ElementFinder = $$('.filter-item').get(0);
    businessFilter: ElementFinder = $$('.filter-item').get(1);
    oneDomainFilter: ElementFinder = $$('.filter-item').get(3);
    cardDescription: ElementArrayFinder = $$('.desc-box');
    productCards: ElementArrayFinder = $$('.ssl-item');
    prices: ElementArrayFinder = $$('.lg-price .price');
    sortButton: ElementFinder = $('.sort-btn');
}