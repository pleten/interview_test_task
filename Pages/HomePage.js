'use strict';

var HomePage = function() {
	this.btnLogIn = element(by.cssContainingText('.btn.flat-dark', 'Log in'));
	this.btnPersonalFilter = element(by.cssContainingText('.btn.round.control', 'Personal'));
	this.btnMultiDomainFilter = element(by.cssContainingText('.btn.round.control', 'multi-domain'));
	this.listSslCertificates = element.all(by.css('.ssl-item'));
	this.btnCheapest = element(by.cssContainingText('.btn.round.control', 'Cheapest'));
	this.listSslPrice = element.all(by.css('.ssl-price-box'));
	this.listSslRating = element.all(by.repeater('product in (prodListCtrl.filteredProducts = (prodListCtrl.products' +
		+'| filter:prodListCtrl.productFilter(prodListCtrl.filter, prodListCtrl.searchQuery)' +
		+'| orderBy:prodListCtrl.filter.orderBy:prodListCtrl.filter.orderByReverse))'));
};

module.exports = HomePage;