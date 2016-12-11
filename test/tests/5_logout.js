describe('Log out', function() {
  before(function(done) {
    signin({
      username: config.username,
      password: config.password
    }).then(done);
  });

  it('should redirect to authorization page', function(done) {
    driver.findElement(by.css('button.dropdown-btn')).click();
    driver.findElement(by.xpath('//button[contains(text(), "Log out")]')).click();
    waitForPageLoad();
    driver.getCurrentUrl().then(function(url) {
      assert.equal(url, 'https://www.ssls.com/authorize');
      done();
    });
  });
});
