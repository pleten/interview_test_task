describe('Invalid email', function() {
  before(function(done) {
    signin({
      username: 'iegor.zakharovgmail.com',
      password: config.password
    }).then(done);
  });

  it('should show tooltip with error message', function(done) {
    driver.executeScript("return $('.left-tooltip-box .tooltip-box-error:contains(\"Uh oh! Thisisn’t an email\"):visible()').length").then(function(resLength) {
      assert(resLength);
      done();
    });
  });
});
