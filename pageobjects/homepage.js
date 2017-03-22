
var homepage = function(){

	var EC = protractor.ExpectedConditions;

	//
	//buttins
	var _login_b = element(by.css('a[ui-sref="authorize.index"]'));
	var _sert_list_b = element(by.css('div > a[ui-sref="user.certificates.list"]'));

	var _user_menu_b = element(by.css('button[nc-dropdown-trigger="statusOpened"]'));
	var _menu_item_l = element(by.css('ul[nc-dropdown="statusOpened"]'));

	//url current page
	this.selfUrl = 'https://www.ssls.com/';
	
	this.getAuthForm = function(){
		_login_b.click();
		return require('./authform');
	};

	this.user_cert_button = function(){
		return _sert_list_b;
	};

	this._buttMenu = function(position){
		_user_menu_b.click()

	};
	this.selectfromMenu = function(item){
		this._buttMenu();
		browser.wait(EC.visibilityOf(_menu_item_l));
		return _menu_item_l.element.all(by.css('a[ui-sref]')).filter(function(it) {
			it.getText().then(function(txt) {
				return txt == item;
			});
		}).first().click()

	};

	this.logout = function(){
		this._buttMenu();
		browser.wait(EC.visibilityOf(_menu_item_l));
		_menu_item_l.element(by.css('button.drop-button')).click();
		return require('./authform')
	};
};
module.exports = new homepage();
