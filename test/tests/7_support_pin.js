describe('Refreshing support pin field', function() {
  before(function(done) {
    signin({
      username: config.username,
      password: config.password
    }).then(done);
  });

  it('should update pin', function(done) {
    var pinText;

    driver.findElement(by.css('button.dropdown-btn')).click();
    driver.findElement(by.xpath("//a[contains(text(), 'View profile')]")).click();
    waitForPageLoad();

    driver.executeScript("return $('.item:contains(\"Support pin\") .description').text().trim()").then(function(text) {
      pinText = text;
    });

    driver.findElement(by.name('supportPin')).click();
    waitForPageLoad();

    driver.executeScript("return $('.item:contains(\"Support pin\") .description').text().trim()").then(function(text) {
      assert.notEqual(text, pinText);
      done();
    });
  });
});
