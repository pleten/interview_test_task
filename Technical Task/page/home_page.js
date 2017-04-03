require ('../page/authorization_page.js');

var home_page = function(){
	
	var until = protractor.ExpectedConditions;
	var loginLink = $("a[class='btn flat-dark ng-scope']");
	var priceFilterButton = $("a[class='btn block round control ng-scope']");
	var priceFilterLabel = $("a[class='btn block round control ng-scope'] span");
	var displayedCertificates = $("div[class='cert-list clear'] div[class='desc-box ng-binding']");
	var domainNumberCertificateLabels = element.all(by.cssContainingText("div[class='cert-list clear'] div[class='desc-box ng-binding'] p", '3-100 domains'));	
	var lowAssuranceCertificateLabels = element.all(by.cssContainingText("div[class='cert-list clear'] div[class='desc-box ng-binding'] p", 'Low assurance'));	
	
	this.getNumberOfMultiDomainCertificates = function(){
		return domainNumberCertificateLabels.length;
	};
	
	this.getLowAssuranceCertificateLabels = function(){
		return lowAssuranceCertificateLabels.getText();
	};
	
	this.getDisplayedCertificatesCount = function(){
		return displayedCertificates.length;
	};
		
	this.clickOnLoginLink =	function(){
		loginLink.click();	
		return require('./authorization_page.js');
	};
	
	this.clickOnPersonalFilter = function(value){
		var selector = element(by.cssContainingText("div[class='filter-box ng-scope'] a", value));
		selector.click();
	};	
	
	this.clickOnPriceFilter = function(){
		priceFilterButton.click();
	};
	
	this.getPriceFilterLabel = function(){
		browser.wait(until.presenceOf(priceFilterLabel), 5000, 'Element taking too long to appear in the DOM');
		return priceFilterLabel.getAttribute('text');
	};
		
};
module.exports = new home_page();