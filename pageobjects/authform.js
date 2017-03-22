

var authform = function(){
	//fields
	var _email_f = element(by.model("form.email"));
	var _pwd_f = element(by.model("form.password"));
    //buttons
	var _loginning_b = element(by.css('button.btn.block.primary'));
	var _show_pwd_b = element(by.css('span.icon.icon-eye'));
    //messages
	var _error_log_m = element(by.css("span.noty_text"));
	var _error_email_m = element(by.xpath("//div[@class='form-group email']//div[@class='left-tooltip-box']//span"));
	var _error_pwd_m = element(by.xpath("//div[@class='form-group']//div[@class='left-tooltip-box']//span"));

	this.selfUrl = 'https://www.ssls.com/authorize';

	var EC = protractor.ExpectedConditions;
	this.sendCredentials = function(email, pwd){
		_email_f.sendKeys(email);
		_pwd_f.sendKeys(pwd);
	};
	
	this.login = function(){
		_loginning_b.click();
		return require('./homepage')
	};

	this.showpwd = function(){
		_show_pwd_b.click();

	};
	this.pwdisVisible = function(){
		return _pwd_f.getAttribute("type") != 'text';
	};

    this.autherror = function(){
        browser.wait(EC.visibilityOf(_error_log_m));
        return _error_log_m
    };

    this.emailerror = function() {
        browser.wait(EC.visibilityOf(_error_email_m));
        return _error_email_m.getText().then(function(message) {
            message = message.replace(/\n/g, " ");
            return message;
        });
    };

    this.pwderror = function(){
        browser.wait(EC.visibilityOf(_error_pwd_m));
        return _error_pwd_m.getText().then(function(message) {
            message = message.replace(/\n/g, " ");
            return message;
        });
    };


};
module.exports = new authform();