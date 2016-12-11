describe('Empty fields', function() {
  before(function(done) {
    signin({
      username: '',
      password: ''
    }).then(done);
  });

  it('should show tooltip with error message near "email" field', function(done) {
    driver.executeScript("return $('.left-tooltip-box .tooltip-box-error:contains(\"Oops, pleaseenter your email\"):visible()').length").then(function(resLength) {
      assert(resLength);
      done();
    });
  });

  it('should show tooltip with error message near "password" field', function(done) {
    driver.executeScript("return $('.left-tooltip-box .tooltip-box-error:contains(\"Looks like you’vemissed this one\"):visible()').length").then(function(resLength) {
      assert(resLength);
      done();
    });
  });
});
