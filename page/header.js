require('../page/login_page.js');
require('../page/profile_page.js');

var header = function(){
    var _header = element(by.xpath("//div[@class='header clear']"));
    var _loginButton = _header.element(by.xpath(".//a[contains(@class,'user-btn')] | //a[@ui-sref='authorize.index']"));
    var _expandUserMenuBtn = _header.element(by.xpath('.//button[@nc-dropdown-trigger="statusOpened"]'));

    this.openLoginForm = function(){
        _loginButton.click();
        return require('./login_page.js');
    };

    this.getLoginButtonText = function(){
        return _loginButton.getText().then(function(text){
            return text;
        });
    };

    this.expandUserMenu=function(){
        _expandUserMenuBtn.click();
        return _header.element(by.xpath(".//ul[@nc-dropdown='statusOpened']"));
    };

    this.logOut=function(){
        if(this.getLoginButtonText()!='Log in'){
            var logOutBtn = this.expandUserMenu().element(by.xpath('//button[@ng-click="logout()"]')).click();
            return require('./login_page.js');
        }
    };

    this.selectMenu=function(option){
        var itemBy = by.xpath(".//a[text()='"+option+"']");
        if(option=='Purchased certs' || option=='Order history' || option=='Add funds' || option=='View profile'){
            this.expandUserMenu().element(itemBy).click();
            switch(option){
                case 'Purchased certs':
                    break;
                case 'Order history':
                    break;
                case 'Add funds':
                    break;
                case 'View profile':
                    return require('./profile_page.js');
                default:
                    break;
            }
        }

    };

}
module.exports = new header();