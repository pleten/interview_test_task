var HomePage = {
LOGIN_BUTTON : '.btn.flat-dark.ng-scope',
PERSONAL_FILTER : '.filter-box.ng-scope [ng-class*=low]',
MULTIDOMAIN_FILTER : '.filter-item.ng-scope:nth-child(2) a',
CHEAPEST_FEATURED_FILTER : '.btn.block.round.control.ng-scope',
SSL_ITEMS : ".ssl-item",
FIRST_ITEM_PRICE : '.ssl-item:nth-child(1) [class*=lg-price]'
};

var LoginPage = {
	LOGIN_BUTTON : '.btn.block.primary',
	EMAIL_INPUT : '.form-group.email input',
	PASSWORD_INPUT : '.input-box.password input',
	SHOW_PASSWORD_BUTTON : ".btn-input.btn-input-block",
	USER_CERTIFICATES_BUTTON : ".user-btn",
	DROPDOWN_BUTTON : ".dropdown-btn",
	DROPDOWN_CONTAINER : ".dropdown",
	NOT_REGISTERED_USER_MESSAGE : ".noty_message.message span",
	EMAIL_ERROR_MESSAGE : "[class=left-tooltip-box][ng-show*='authForm.email'] span",
	PASSWORD_ERROR_MESSAGE : "[class=left-tooltip-box][ng-show*='authForm.password'] span",
	LOGOUT_BUTTON : "[ng-click='logout()']",
	PROFILE_BUTTON : "[ui-sref='user.profile']"
};

var ProfilePage = {
    NAME_FIELD : "[class*='text'][ng-hide*='name']",
    EMAIL_FIELD : "[class*='text'][ng-hide*='email']",
    PHONE_FIELD : "[class*='text'][ng-hide*='phone']",
    ADDRESS_FIELD : "[class*='text'][ng-hide*='address']",
    SUPPORT_PIN_FIELD : "[ng-class*=pin] .description span",
    NEWSLETTER_FIELD : "[ng-class*=newsletter] [class*=mail-list]",
    SUPPORT_PIN_REFRESH : "[name=supportPin]"

};

module.exports = {HomePage, LoginPage, ProfilePage};