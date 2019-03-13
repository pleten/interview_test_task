var HomePage = function async() {
  var loginButton = $('.btn.flat-dark.ng-scope');

  var certificates = $$('.ssl-item');

  var personalFilter = element(by.cssContainingText('.filter-item a', 'Personal'))
  var multiDomainFilter = element(by.cssContainingText('.filter-item a', 'multi-domain'))
  var cheapestFilter = element(by.cssContainingText('.filter-item a', 'Cheapest'))
  var featuredFilter = element(by.cssContainingText('.filter-item a', 'Featured'))

  this.getСertificates = function () {
    return certificates;
  };

  this.getLoginButton = function () {
    return loginButton;
  };

  this.clickFeaturedFilter = async function () {
    await featuredFilter.click();
  };

  this.clickCheapestFilter = async function () {
    await cheapestFilter.click();
  };

  this.clickPersonalFilter = async function () {
    await personalFilter.click();
  };

  this.clickMultiDomainFilter = async function () {
    await multiDomainFilter.click();
  };

  this.clickLoginButton = async function () {
    await loginButton.click();
  };

  this.getPrices = async function () {
    var prices = await certificates.map(async (item) => {
      var regex = /[\d|,|.|\+]+/g;
      var price = await item.$('.lg-price .price').getText();
      return await parseFloat(price.match(regex));
    })
    return prices;
  };

  this.getNames = async function () {
    var names = await certificates.map(async (item) => {
      return await item.$('h3.ssl-name').getText();
    })
    return names;
  };

};
module.exports = HomePage;