class BasePage {
  constructor() {
    this.dropDownMenu = element(by.css('.dropdown-btn'));
  }
  async get() {
    await browser.get(this.url);
  }

  async scrollTo(element) {
    await browser.actions().mouseMove(element).perform();
  }

  async waitForElementVisibility(element) {
    await browser.wait(ExpectedConditions.visibilityOf(element), 5000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }
}

module.exports = BasePage;
