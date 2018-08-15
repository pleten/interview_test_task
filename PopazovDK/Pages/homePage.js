let homePage = function () {

    let navigationUtil = require("../utilities/navigation.util.js");
    this.loginButton = element(by.xpath("//a[@href = '/authorize']"));
    this.userEmailButton = element(by.xpath("//a[@href = '/user/certificates']"));
    this.loginEmailInput = element(by.model('form.email'));
    this.loginPasswordInput = element(by.model('form.password'));
    this.showPasswordButton = element(by.xpath("//button[@ng-click= 'showPassword = !showPassword']"));
    this.submitButton = element(by.xpath("//div[@class = 'email-box']//button[@type= 'submit']"));
    this.notificationContainer = element(by.id("noty_topCenter_layout_container"));
    this.certificatesRating = element.all(by.xpath("//div[contains(@ng-repeat, 'product in (prodListCtrl')]//div[contains(@class, 'rating stars')]"));
    this.certificatesPrice = element.all(by.xpath("//div[contains(@ng-repeat,'product in (prodListCtrl')]//span[@class = 'price']"));
    this.emailValidationMessage = element(by.xpath("//div[@class='form-group email']//div[@class='left-tooltip-box']//span"));
    this.passwordValidationMessage = element(by.xpath("//div[@class='form-group']//div[@class='left-tooltip-box']//span"));

    this.certificates = element.all(by.xpath("//div[contains(@ng-repeat,'product in (prodListCtrl')]"));

    this.userDropDownButton = element(by.xpath("//button[@nc-dropdown-trigger]"));
    this.logoutButton = element(by.xpath("//button[@ng-click = '$ctrl.logout()']"));
    this.userProfileButton = element(by.xpath("//a[@href = '/user/profile']"));

    this.sortCertificatesButton = element(by.xpath("//div[@class='sort-btn ng-scope']//a[@class='btn block round control ng-scope']"));


    let baseUrl = browser.baseUrl;
    let authorizationUrl = baseUrl + browser.params.authorizePageUrl;
    let profileUrl = baseUrl + browser.params.profilePageUrl;
    let certificateValue = [];

    this.get = () => {
        browser.get(baseUrl);
        expect(browser.getCurrentUrl()).toBe(baseUrl);
    };

    this.fillCredential = (login, password) => {
        this.loginButton.click();
        expect(browser.getCurrentUrl()).toBe(authorizationUrl);
        navigationUtil.waitTillElementToBeClickable(this.loginEmailInput);
        this.loginEmailInput.clear();
        this.loginEmailInput.sendKeys(login);
        this.loginPasswordInput.clear();
        this.loginPasswordInput.sendKeys(password);
    };

    this.logIn = (login, password) => {
        this.fillCredential(login, password);
        this.submitButton.click();
        this.validateUserLoggedIn(login);
    };

    this.logOut = () => {
        this.userDropDownButton.isPresent()
            .then((result) => {
                if (result) {
                    this.userDropDownButton.click();
                    navigationUtil.waitTillElementToBeClickable(this.logoutButton);
                    this.logoutButton.click();
                    navigationUtil.waitTillElementToBeClickable(this.loginButton);
                    expect(browser.getCurrentUrl()).toBe(authorizationUrl);
                }
            })
    };

    this.navigateToUserProfilePage = () => {
        this.userDropDownButton.click();
        navigationUtil.waitTillElementToBeClickable(this.userProfileButton);
        this.userProfileButton.click();
        expect(browser.getCurrentUrl()).toBe(profileUrl);
    };

    this.validateUserLoggedIn = (login) => {
        expect(browser.getCurrentUrl()).toBe(browser.baseUrl);
        navigationUtil.waitTillElementToBeClickable(this.userEmailButton);
        expect(this.userEmailButton.getText()).toBe(login, "Wrong Text present on user email button");
        expect(this.loginButton.isPresent()).not.toBe(true, "Login button still present");
        expect(this.userDropDownButton.isPresent()).toBe(true, "User DropDown not displayed");
    };

    this.validateShowPasswordButton = (password) => {
        this.showPasswordButton.click();
        navigationUtil.waitTillTextToBePresentInElement(this.loginPasswordInput, password);
    };

    this.validateErrorMessage = (message) => {
        browser.sleep(500);//prevent some random fails
        navigationUtil.waitTillElementToBeClickable(this.notificationContainer);
        expect(this.notificationContainer.getText()).toBe(message, "incorrect Error message")

    };

    this.validateValidationMessage = (fieldSelector, message) => {
        navigationUtil.waitTillElementToBeClickable(fieldSelector);
        fieldSelector.getText()
            .then((text) => {
                text = text.replace(/\r?\n|\r/g, " ");
                expect(text).toBe(message, "Incorrect message displayed")
            })
    };

    this.clickFilterByText = (filterName) => {
        filterName = filterName.toLowerCase().substring(1);
        let filter = element(by.xpath(`//div/a[contains(text(),'${filterName}')]`));
        navigationUtil.waitTillElementToBeClickable(filter);
        filter.click();

    };

    this.validateCertificatesOrderedByRate = () => {
        this.certificatesRating.each((eachRate) => {
            eachRate.getAttribute('class')
                .then(function (classValue) {
                    certificateValue.push(classValue);
                });
        }).then(() => {
            for (let i = 0; i < certificateValue.length - 1; i++) {
                expect(certificateValue[i] >= certificateValue[i + 1]).toBe(true, " Certificates Not Sorted by Rate")
            }
        })
    };

    this.validateCertificatesOrderedByPrice = () => {
        this.certificatesPrice.each((eachRate) => {
            eachRate.getText()
                .then(function (text) {
                    text = text.replace(/[^0-9]/g, "");
                    certificateValue.push(parseInt(text));
                });
        }).then(() => {
            for (let i = 0; i < certificateValue.length - 1; i++) {
                expect(certificateValue[i] <= certificateValue[i + 1]).toBe(true, " Certificates Not Sorted by Price")
            }
        })
    };

    this.clickSortButton = () => {
        this.sortCertificatesButton.click();

    }


};

module.exports = new homePage();