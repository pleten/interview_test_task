describe('Client area', function() {
  before(function(done) {
    signin({
      username: config.username,
      password: config.password
    }).then(done);
  });

  it('should redirect to profile page', function(done) {
    driver.findElement(by.css('button.dropdown-btn')).click();
    driver.findElement(by.xpath("//a[contains(text(), 'View profile')]")).click();
    waitForPageLoad();
    driver.getCurrentUrl().then(function(url) {
      assert.equal(url, 'https://www.ssls.com/user/profile')
      done();
    });
  });

  it('should contain name', function(done) {
    driver.executeScript("return $('.item:contains(\"Name\") .description .text').text().trim()").then(function(someText) {
      assert.equal(someText, 'Vasya Pupkin');
      done();
    });
  });

  it('should contain email', function(done) {
    driver.executeScript("return $('.item:contains(\"Email\") .description .text').text().trim()").then(function(someText) {
      assert.equal(someText, 'ssls.automation+4@gmail.com');
      done();
    });
  });

  it('should contain password', function(done) {
    driver.executeScript("return $('.item:contains(\"Password\") .description .text').text().trim()").then(function(someText) {
      assert.equal(someText, '*****');
      done();
    });
  });

  it('should contain phone', function(done) {
    driver.executeScript("return $('.item:contains(\"Phone\") .description .text').text().trim()").then(function(someText) {
      assert.equal(someText, '+380 57123456789');
      done();
    });
  });

  it('should contain address', function(done) {
    driver.executeScript("return $('.item:contains(\"Address\") .description .text').text().trim()").then(function(someText) {
      assert.equal(someText, 'Diagon alley 2, Misto, Uryupinsk 612120, Ukraine');
      done();
    });
  });

  it('should contain support pin', function(done) {
    driver.executeScript("return $('.item:contains(\"Support pin\") .description .text').text().trim()").then(function(someText) {
      assert.notEqual(someText, '');
      done();
    });
  });

  it('should be included in mailing list', function(done) {
    driver.executeScript("return $('.item:contains(\"Newsletter\") .description').text().trim()").then(function(someText) {
      assert.equal(someText, 'Include in mailing list');
      done();
    });
  });
});
