var loginPage = function () {

    var login = element(by.xpath('//a[text()="Log in"]'));
    var clickLogin = element(by.xpath('//button[text()="Login"]'));

    var email = element(by.model('form.email'));
    var password = element(by.model('form.password'));
    var eye = element(by.xpath('//span[@ng-hide="showPassword"]'));
    var showPass = element(by.xpath('//span[@ng-show="showPassword" and @class="icon icon-eye-off"]'));
    // welcome
    var welcome = element(by.xpath('//a[text()="ssls.automation+5@gmail.com"]'));
    var drop_down = element(by.xpath('//*[@nc-dropdown-trigger="statusOpened"]'));
    var log_out = element(by.xpath('//button[text()="Log out"]'));
    var auth = element(by.xpath('//h1[text()="Authorization"]/following::p[contains(.,"Welcome back!")]'));



     this.logger = function (log_text) {
         console.log(log_text);
     };
    
    
    this.home = function (site) {
        browser.get(site);
        
    };

    this.header_link = function (header_link) {
        expect(login.getText()).toBe(header_link);
        login.click();
        
    };
    this.button_login = function (login) {
        expect(clickLogin.getText()).toBe(login);
        clickLogin.click();
        
    };

    this.form_auth = function (text) {
        expect(auth.getText()).toEqual(text);
    };


    //errors

    this.email_field_error = function (msg_email, msg_email_2) {
        var validEmail = element(by.xpath('//*[@class="tooltip tooltip-error"]/span[contains(.,"' + msg_email + '") and contains(.,"' + msg_email_2 + '")]'));
        return validEmail.isDisplayed();
        
    };
    
    this.pass_field_error = function (msg_pass, msg_pass_2) {
        var validPass = element(by.xpath('//*[@class="tooltip tooltip-error"]/span[contains(.,"' + msg_pass + '") and contains(.,"' + msg_pass_2 + '")]'));
        return validPass.isDisplayed();
    };

    this.wait_element = function (email_msg) {
           var wait = element(by.xpath('//span[text()="' + email_msg + '"]'));
            browser.sleep(2000);
        return wait.isPresent();
        
        

    };




    // fields login
    this.email_field = function (email_field) {
        email.sendKeys(email_field);
        
    };
    this.password_field = function (pass) {
        password.sendKeys(pass);
        
    };
    this.eye_password = function () {
        eye.click();
        
    };
    this.show_password = function () {
        return showPass.isDisplayed();
    };

    this.welcome_back = function () {
        return welcome.getText();
    };
    
    // logout
    
    this.drop_down_header = function () {
        drop_down.click();

    };
    
    this.logout = function () {
        log_out.isPresent();
        log_out.click();
    };

    this.getUrl = function (url) {
        expect(browser.getCurrentUrl()).toEqual(url);

    };
    
};  
module.exports = new loginPage();