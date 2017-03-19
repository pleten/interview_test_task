var testData = require('../Data/TestConstants');
var locators = require('../Data/Locators');

var HomePage = function() {
// elements
	var loginButton = element(by.css(locators.HomePage.LOGIN_BUTTON));
	var personalFilter = element(by.css(locators.HomePage.PERSONAL_FILTER));
	var multidomainFilter = element(by.css(locators.HomePage.MULTIDOMAIN_FILTER));
	var cheapestFeaturedFilter = element(by.css(locators.HomePage.CHEAPEST_FEATURED_FILTER));
	var elementPrice = element(by.css(locators.HomePage.FIRST_ITEM_PRICE));

// methods
	this.navigateToURL = function() {
		console.log("Set browser.ignoreSynchronization = true");
		browser.ignoreSynchronization = true;

		// the amount of time to wait before declaring
		// that the element was not found
		browser.manage().timeouts().implicitlyWait(
				testData.Timeout.MAX_ELEMENT_WAIT_TIME_MILI);

		browser.driver.manage().window().maximize();

		console.log('Navigating to URL...');
		browser.get('https://ssls.com');
	};

	this.clickLoginButton = function() {
        this.getLoginButton().click();
    };

    this.clickPersonalFilter = function() {
            this.getPersonalFilter().click();
    };

    this.clickMultidomainFilter = function() {
                this.getMultidomainFilter().click();
    };

    this.clickCheapestFeaturedFilter = function() {
                    this.getCheapestFeaturedFilter().click();
    };

    this.countSslElements = function () {
            var deferred = protractor.promise.defer();
            browser.findElements(By.css(locators.HomePage.SSL_ITEMS)).then(function (elements_arr) {
                deferred.fulfill(elements_arr.length);
            });
            return deferred.promise;
        };

	this.getLoginButton = function() {
    		return loginButton;
    };

    this.getMultidomainFilter = function() {
        		return multidomainFilter;
    };

     this.getPersonalFilter = function() {
            		return personalFilter;
    };

    this.getCheapestFeaturedFilter = function() {
                		return cheapestFeaturedFilter;
    };

    this.getFirstItemPrice = function() {
                    		return elementPrice;
        };


};

module.exports = new HomePage();