describe('Correct credentials', function() {
  before(function(done) {
    signin({
      username: config.username,
      password: config.password
    }).then(done);
  });

  it('should authorize', function(done) {
    driver.findElement(by.css('.user-btn')).getText().then(function(btnText) {
      assert.equal(btnText, config.username);
      done();
    });
  });

  it('should show dropdown menu', function(done) {
    driver.findElement(by.css('button.dropdown-btn')).then(function(isPresent) {
      assert(isPresent);
      done();
    });
  });
});
