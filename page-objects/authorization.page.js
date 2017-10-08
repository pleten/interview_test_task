var AuthorizationPage = function() {

    this.email = element(by.model('form.email'));
    this.password = element(by.model('form.password'));
    this.loginBtn = element(by.buttonText('Login'));
    this.errorMessage = element(by.css('.noty_text'));
    this.emptyEmailError = element(by.xpath("//span[@class='tooltip-text' and contains(text(),'Oops')]"));
    this.emptyPasswordError = element(by.xpath("//span[@class='tooltip-text' and contains(text(),'Looks')]"));
    this.tooltipMessage = element(by.css('.tooltip-text'));
    this.eyeIcon = element(by.css('.btn-input'));

    this.authContainer = element(by.css('.authorization-page'));


    this.login = function(user) {
        this.email.sendKeys(user.email);
        this.password.sendKeys(user.password);
        this.checkPassword(this.password, user.password)
        this.loginBtn.click();
    }

    this.checkPassword = function(element, data) {
        this.eyeIcon.click();
        element.getAttribute('value').then(function(value) {
            expect(value).toEqual(data);
        })
    }
}

module.exports = AuthorizationPage;
