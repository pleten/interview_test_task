let BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor() {
    super();
    this.personal = element(
      by.xpath('//div[@class="filter-item"]/child::a[contains(text(),"Personal")]')
    );
    this.business = element(
      by.xpath('//div[@class="filter-item"]/child::a[contains(text(),"Business")]')
    );
    this.oneDomain = element(
      by.xpath('//div[@class="filter-row ng-scope"]/descendant ::a[contains(.,"one domain")]')
    );
    this.filterResult = element(by.xpath('//div[@class="cert-list clear"]'));
    this.sslItem = by.xpath('//div[@class="ssl-content"]');
    this.cheapSet = element(by.xpath('//a[@class="btn block round control ng-scope"]'));
    this.price = by.xpath('//div[@class="ssl-price-box"]/descendant ::span[@class="price"]');
  }

  async checkFilterResult(element, elements, ...args) {
    let arr = await element.all(elements).getText();
    let formatedArr = arr.map(i => i.replace(/\n|\r|\r\n/gm, ' '));
    return formatedArr.every(i => i.includes(...args));
  }

  compareNumeric(a, b) {
    return a - b;
  }

  async getPrices(element, elements) {
    let arr = await element.all(elements).getText();
    return arr.map(i => +i.replace(/\/YR|\$/g, ''));
  }

  async sortPrices(element, elements) {
    let arr = await element.all(elements).getText();
    let formatedArr = arr.map(i => +i.replace(/\/YR|\$/g, ''));
    return formatedArr.sort(this.compareNumeric);
  }
}

module.exports = new HomePage();
