import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
let homePage = new HomePage();
let loginPage = new LoginPage();

describe('Tests For Home Page', () => {
  beforeAll(()=>{
    return loginPage.goToHomePage();
  });

  it('should check only Personal filter', () => {
    const personalFilter = homePage.getFilters().get(0);
    return browser.executeScript('arguments[0].scrollIntoView()', personalFilter)
      .then(() => personalFilter.click())
      .then(() => homePage.getFilters().get(0).getAttribute('class'))
      .then((className) => expect(className).toContain('active'));
  });

  it('should check only Personal filter + Multi-domain filter', () => {
    const MultiDomain = homePage.getFilters().get(4);
    return browser.executeScript('arguments[0].scrollIntoView()', MultiDomain)
      .then(() => MultiDomain.click())
      .then(() => homePage.getFilters().get(0).getAttribute('class'))
      .then((className) => expect(className).toContain('active'))
      .then(() => homePage.getFilters().get(4).getAttribute('class'))
      .then((className) => expect(className).toContain('active'));
  });

  it('should verify that sorting by dafault is done by "featured"', () => {
    return homePage.getSorting().getText()
      .then((text) => expect(JSON.stringify(text)).toEqual('["CHEAPEST"]'));
  });

  it('should chect sorting to "Cheapest', () => {
    return homePage.getSorting().click()
      .then(() => homePage.getSorting().getText())
      .then((text) => expect(JSON.stringify(text)).toEqual('["FEATURED"]'));
  });
});