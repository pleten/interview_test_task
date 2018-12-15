class MainPage {

    constructor(path = '/') {
        this.path = path;
    }

    get loginButton() {
        return $('.log-box');
    }

    get userButton() {
        return $('.btn.user-btn');
    }

    get userMenu() {

        return new class UserMenu {

            get _wrapper() {
                return $('.dropdown.ng-isolate-scope');
            }

            get profileButton() {
                return this._wrapper.$('a[ui-sref="user.profile"]');
            }

            get userDropDownButton() {
                return $('.dropdown-btn');
            }

            get logoutButton() {
                return $('.drop-button');
            }
        };
    }



    async open() {
        await browser.get(this.path, 15000);
    }

}

module.exports = MainPage;

