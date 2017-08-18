'use strict';

let chai = require("chai"),
    expect = chai.expect;
chai.use(require("chai-sorted"));

let I;

module.exports = {

    _init() {
        I = actor();
        this.header = require('../fragments/header');
        this.header._init();
    },

// Elements

    certificateCard: "//div[contains(@class,'ssl-item')]",
    featuredCertificateLabel: '.promo-text',

    filterButton(name){
        return `//div[contains(@class,'filter-item')]//a[contains(.,'${name}')]`
    },

    sortOption(name){
        return `//a[contains(.,'${name}')]`
    },


// Actions

    clickFilter(name){
        I.click(this.filterButton(name))
    },

    sortCertificatesBy(name){
        I.click(this.sortOption(name))
    },

    getQuantityOfCertificates: function*(){
        let quantity = yield I.grabNumberOfVisibleElements(this.certificateCard);
        return quantity
    },

    getQuantityOfFeaturedCertificates: function*(){
        let quantity = yield I.grabNumberOfVisibleElements(this.featuredCertificateLabel);
        return quantity
    },

    checkThatOnlyPersonalCertificatesShown: function*(){
        let quantity = yield* this.getQuantityOfCertificates();
        for (let i=1; i<=quantity; i++){
            I.seeElement(`${this.certificateCard}[${i}]//h3[contains(.,'PositiveSSL')]`)
        }
    },

    checkThatOnlyMultiDomainCertificatesShown: function*(){
        let quantity = yield* this.getQuantityOfCertificates();
        for (let i=1; i<=quantity; i++){
            I.seeElement(`${this.certificateCard}[${i}]//p[contains(.,'3-100 domains')]`)
        }
    },

    checkSortingByFeatured: function*(){
        let total = yield* this.getQuantityOfCertificates();
        let featured = yield* this.getQuantityOfFeaturedCertificates();
        for (let i=1; i<=total; i++){
            I.seeElement(`${this.certificateCard}[${i}]//span[@class='promo-text']`);
            if (i === featured){
                break
            }
        }
    },

    checkSortingByCheapest: function* () {
        let quantity = yield* this.getQuantityOfCertificates();
        let sortedPrices = [];
        for (let i=1; i<=quantity; i++){
            let price = yield I.grabValueFrom(`${this.certificateCard}[${i}]//price[@class='lg-price ng-isolate-scope']`);
            sortedPrices.push(parseInt(price));
        }
        expect(sortedPrices).to.be.sorted();
    }
};