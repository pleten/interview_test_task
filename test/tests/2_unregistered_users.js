describe('Unregistered users', function() {
  before(function(done) {
    signin({
      username: 'iegor.zakharov@gmail.com',
      password: config.password
    }).then(done);
  });

  it('should show error notification', function(done) {
    driver.findElement(by.css('.noty_bar.noty_type_information')).getText().then(function(text) {
      assert.equal(text, 'Uh oh! Email or password is incorrect');
      done();
    });
  });
});
