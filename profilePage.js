'user strict';

var profilePage = function(){

  var _regeneratePin = element(by.css('[ng-click="regeneratePin()"]'));
  var EC = protractor.ExpectedConditions;

  this.updatePin=function(){
      _regeneratePin.click();
      browser.wait(EC.not(EC.presenceOf($('.item disabled'))),5000);
      return element.all(by.css('.text.ng-binding')).get(5).getText();
  };

  this.getItemText = function(el){
    var el;
    return element(by.css('[ng-hide="activeRow === \''+el+'\'"].ng-binding')).getText()
	};

};
module.exports = new profilePage();
