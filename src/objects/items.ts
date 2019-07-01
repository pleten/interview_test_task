import {Component} from "../utils/components";
import {by} from "protractor";

export namespace Item {
    export class Certificate extends Component.Base {
        constructor(search: string = "") {
            super(
                by.cssContainingText(".certificate", search),
                search
            );
        }
    }

    export class Product extends Component.Base {
        priceInteger: Component.Base;
        priceCent: Component.Base;

        constructor(search: string = "") {
            super(
                by.cssContainingText(".ssl-item", search),
                search
            );

            this.priceInteger = this.new(Component.Base, by.css(".price .integer"), "price integer");
            this.priceCent = this.new(Component.Base, by.css(".price .cent"), "price cents");
        }
    }

    export class Profile extends Component.Base {
        description: Component.Base;

        constructor(search: string = "") {
            super(
                by.cssContainingText(".profile-content .item", search),
                search
            );

            this.description = this.new(Component.Base, by.css(".description .text"), "description");
        }
    }

    export class SupprotPinProfile extends Profile {
        get refreshButton() {
            return this.new(Component.Button, by.css("[name=\"supportPin\""), "refresh");
        }
    }

    export class NewsletterProfile extends Profile {
        get turnOnCheckbox() {
            return this.new(Component.Checkbox, by.css("[name=\"newsletterOn\""), "turn on");
        }
    }
}
