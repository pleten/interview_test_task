let login = require('../PageObjects/LoginPage');
let home = require('../PageObjects/HomePage');

describe('Home page. filters', () => {
  beforeEach(async () => {
    await login.get('https://ssls.com');
    login.fillInlogInForm('ssls.automation+5@gmail.com', '123456');
    login.clickLogInButton();
  });

  afterEach(() => {
    browser.driver.manage().deleteAllCookies();
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('Personal filter', async () => {
    await home.waitForElementVisibility(home.personal);
    home.personal.click();
    await home.scrollTo(home.filterResult);
    let expectedFilterResult = await home.checkFilterResult(home.filterResult, home.sslItem, [
      'Domain validation'
    ]);
    //check filter results
    expect(expectedFilterResult).toEqual(true);
    home.personal.click();
    await home.scrollTo(home.filterResult);
    let expectedFilterReset = await home.checkFilterResult(home.filterResult, home.sslItem, [
      'Domain validation'
    ]);
    //check filter reset
    expect(expectedFilterReset).toEqual(false);
  });

  it('"Business" and “One domain” filters', async () => {
    await home.waitForElementVisibility(home.business);
    home.business.click();
    home.oneDomain.click();
    await home.scrollTo(home.filterResult);
    let expectedFilterResult = await home.checkFilterResult(
      home.filterResult,
      home.sslItem,
      '1 domain',
      'Organization validation'
    );
    //check filter results
    expect(expectedFilterResult).toEqual(true);
    home.business.click();
    home.oneDomain.click();
    await home.scrollTo(home.filterResult);
    let expectedFilterReset = await home.checkFilterResult(
      home.filterResult,
      home.sslItem,
      '1 domain',
      'Organization validation'
    );
    //check filter reset
    expect(expectedFilterReset).toEqual(false);
  });

  it('Cheapest/Featured', async () => {
    await home.waitForElementVisibility(home.cheapSet);
    home.cheapSet.click();
    await home.scrollTo(home.filterResult);
    let actual = await home.getPrices(home.filterResult, home.price);
    let expected = await home.sortPrices(home.filterResult, home.price);
    expect(expected).toEqual(actual);
  });
});
