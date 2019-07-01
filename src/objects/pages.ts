import {Section} from "./sections";
import {Component} from "../utils/components";
import {browser, by} from "protractor";
import {Item} from "./items";
import {Type} from "../types";

export namespace Page {
    export class Base {
        alias: string;

        constructor(public path: string, shortAlias: string) {
            this.alias = `${shortAlias} page`;
        }

        get notificationBar() {
            return this.new(Component.Base, by.css(".noty_text"), "notification bar");
        }

        get header() {
            return this.new(Section.Header);
        }

        get pageTitle() {
            return this.new(Component.Base, by.css(".page-title"), "page title");
        }

        async open() {
            await browser.get(this.path);
        }

        new<T extends Component.Base, S extends any[]>(componentClass: (new(...args: S) => T), ...componentArgs: S): T {
            const pageComponent = new Component.Base(by.css("body"), this.alias);
            return pageComponent.new(componentClass, ...componentArgs);
        }
    }

    export class Home extends Base {
        filters: Section.HomeFilters;
        sortButton: Component.Button;
        productItem: Item.Product;

        constructor() {
            super("/", "home");

            this.filters = this.new(Section.HomeFilters);
            this.sortButton = this.new(Component.Button, by.css(".sort-btn a"), "sort");
            this.productItem = this.new(Item.Product);
        }
    }

    export class Authorization extends Base {
        loginForm: Section.LoginForm;

        constructor() {
            super("/authorize", "authorization");

            this.loginForm = this.new(Section.LoginForm);
        }
    }

    export class UserProfile extends Base {
        nameItem: Item.Profile;
        emailItem: Item.Profile;
        passwordItem: Item.Profile;
        addressItem: Item.Profile;
        phoneItem: Item.Profile;
        supportPinItem: Item.SupprotPinProfile;
        newsletterItem: Item.NewsletterProfile;

        constructor() {
            super("/user/profile", "user profile");

            this.nameItem = this.new(Item.Profile, "Name");
            this.emailItem = this.new(Item.Profile, "Email");
            this.passwordItem = this.new(Item.Profile, "Password");
            this.addressItem = this.new(Item.Profile, "Address");
            this.phoneItem = this.new(Item.Profile, "Phone");
            this.supportPinItem = this.new(Item.SupprotPinProfile, "Support pin");
            this.newsletterItem = this.new(Item.NewsletterProfile, "Newsletter");
        }

        async getCurrentProfile(): Promise<Type.UserProfile> {
            return  {
                name: await this.nameItem.description.getText(),
                email: await this.emailItem.description.getText(),
                password: await this.passwordItem.description.getText(),
                address: await this.addressItem.description.getText(),
                phone: await this.phoneItem.description.getText(),
                supportPin: await this.supportPinItem.description.getText(),
                newsletter: await this.newsletterItem.turnOnCheckbox.isSelected()
            };
        }
    }

    export class Certificates extends Base {
        constructor() {
            super("/certificates", "certificates");
        }
    }
}
