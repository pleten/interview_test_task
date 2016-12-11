var webdriver = require('selenium-webdriver');

global.config = require('./config')
global.assert = require('assert');
global.by = webdriver.By;
global.until = webdriver.Until;

global.driver = new webdriver.Builder()
  .usingServer(config.selenium_host)
  .withCapabilities({ browserName: 'chrome' })
  .build();

driver.manage().window().maximize();
