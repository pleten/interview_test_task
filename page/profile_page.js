require('../page/login_page.js');
require ('../page/header.js');
var profile_page = function(){
    var EC = protractor.ExpectedConditions;
    var _header = require('./header.js');
    var _pageTitle = $('h1');
    var _newsletterChb = $('[name="newsletterOn"]');
    var _refreshPin = $('[name="supportPin"]');

    this.getTitle = function(){
        return _pageTitle.getText();
    };

    this.getItemValue = function(item){
        var itemBy = by.xpath("//div[./div/span[text()='Support pin']]/div[@class='description']/span");
        if(element(itemBy).isPresent()){
            return element(itemBy).getText();
        }
    };

    this.getNewsletterState=function(){
        return _newsletterChb.isSelected();
    };

    this.refreshSupportPin=function(){
        _refreshPin.click();
        browser.wait(EC.not(EC.presenceOf($('.item disabled'))),7000);
        return this.getItemValue('Support pin');
    };


};
module.exports = new profile_page();
