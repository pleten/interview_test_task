import {Component} from "../utils/components";
import {browser, by} from "protractor";
import {Type} from "../types";

export namespace Section {
    export class LoginForm extends Component.Base {
        email: Component.Field;
        passwordField: Component.PasswordField;
        submitButton: Component.Button;

        constructor() {
            super(by.css("[name=\"authForm\"]"));

            this.email = this.new(Component.Field, by.css("[name=\"email\"]"), "email");
            this.passwordField = this.new(Component.PasswordField, by.css("[name=\"password\"]"), "password");
            this.submitButton = this.new(Component.Button, by.css("button[type=\"submit\"]"), "submit");
        }

        async setUser(testUser: Type.TestUser) {
            await this.email.setValue(testUser.email);
            await this.passwordField.setValue(testUser.password);
        }

        async authorizeUser(testUser: Type.TestUser) {
            await this.setUser(testUser);
            await this.submitButton.click();
            await browser.sleep(500);
        }
    }

    export class Header extends Component.Base {
        loginButton: Component.Button;
        userButton: Component.Button;
        userDropdown: Component.Dropdown;

        constructor() {
            super(by.css(".header"));

            this.loginButton = this.new(Component.Button, by.css(".log-box>.btn"), "login");
            this.userButton = this.new(Component.PasswordField, by.css(".profile-box .user-btn"), "user");
            this.userDropdown = this.new(
                Component.Dropdown,
                by.css(".profile-box .dropdown-btn"),
                "user menu"
            );
        }
    }

    export class HomeFilters extends Component.Base {
        personalButton: Component.SelectableButton;
        businessButton: Component.SelectableButton;
        ecommerceButton: Component.SelectableButton;
        oneDomainButton: Component.SelectableButton;
        multiDomainButton: Component.SelectableButton;
        subdomainsButton: Component.SelectableButton;

        constructor() {
            super(by.css(" .filter-box"));

            this.personalButton = this.getButton("Personal", "personal");
            this.businessButton = this.getButton("Business", "business");
            this.ecommerceButton = this.getButton("Ecommerce", "Ecommerce");
            this.oneDomainButton = this.getButton("one domain", "one domain");
            this.multiDomainButton = this.getButton("multi-domain", "multi-domain");
            this.subdomainsButton = this.getButton("subdomains", "subdomains");
        }

        private getButton(search: string, shortAlias: string) {
            return this.new(Component.SelectableButton, by.cssContainingText(".filter-item a", search), shortAlias);
        }
    }
}
