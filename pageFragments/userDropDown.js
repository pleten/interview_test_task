var UserDropDown = function async() {
    var userButton = $('.profile-box a.user-btn');
    var userDropDown = $('.profile-box button.dropdown-btn');
    var logOutButton = $('ul.dropdown.ng-isolate-scope').$('li button');
    var viewProfileButton = $('ul.dropdown.ng-isolate-scope').$('a[href=\'/user/profile\']');

    this.getUserDropDown = function () {
        return userDropDown;
    };

    this.getUserButton = function () {
        return userButton;
    };

    this.logOut = async function () {
        await userDropDown.click();
        await logOutButton.click();
    };

    this.viewProfile = async function () {
        await userDropDown.click();
        await viewProfileButton.click();
    };

};
module.exports = UserDropDown;