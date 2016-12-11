global.waitForPageLoad = function() {
  driver.manage().timeouts().pageLoadTimeout(10000);
  return driver.sleep(1000);
}

global.signin = function(options) {
  driver.manage().deleteAllCookies();
  driver.get(config.url);
  driver.findElement(by.css('.log-box a')).click();
  waitForPageLoad();
  driver.findElement(by.name('email')).sendKeys(options.username);
  driver.findElement(by.name('password')).sendKeys(options.password);
  driver.findElement(by.xpath('//button[contains(text(), "Login")]')).click();
  return waitForPageLoad();
}
