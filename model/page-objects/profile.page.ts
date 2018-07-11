import {FormInput} from "../widgets/form-input.widget";
import {$, by, element} from "protractor";

let input = new FormInput();

export class ProfilePage {

    url: string = "/user/profile";

    async edit(name: string) {
        return await element(by.xpath(".//*[text()='" + name + "']/../../button/span")).click();
    }

    async setName(firstName: string, lastName: string) {
        await this.edit("Name");

        await input.setByModel("user.firstName", firstName);
        await input.setByModel("user.lastName", lastName);

        await $(".item.edit").element(by.buttonText("Save")).click();

        return this;
    }

    async setEmail(email: string, pass: string) {
        await this.edit("Email");

        await input.setByModel("user.email", email);
        await input.setByCss(".item.edit *[ng-model='user.passwordConfirm']", pass);

        await $(".item.edit").element(by.buttonText("Save")).click();

        return this;
    }

    async setPassword(oldPass: string, newPass: string) {
        await this.edit("Password");

        await input.setByCss(".item.edit *[ng-model='user.passwordConfirm']", oldPass);
        await input.setByModel("user.password", newPass);

        await $(".item.edit").element(by.buttonText("Save")).click();

        return this;
    }

    async setPhone(phoneCode: string, phoneNumber: string) {
        await this.edit("Phone");

        await element(by.model("user.phone.code")).click();
        await element(by.cssContainingText("option", phoneCode)).click();

        await input.setByModel("user.phone.number", phoneNumber);

        await $(".item.edit").element(by.buttonText("Save")).click();

        return this;
    }

    async setAddress(street: string, city: string, state: string, zip: string, country: string) {
        await this.edit("Address");

        await input.setByModel("user.address.street", street);
        await input.setByModel("user.address.city", city);
        await input.setByModel("user.address.state", state);
        await input.setByModel("user.address.zip", zip);
        await input.setByCss(".item.edit input[ng-model='countryTyped']", country);

        await $(".item.edit").element(by.buttonText("Save")).click();

        return this;
    }

    async getSupportPin() {
        return await element(by.cssContainingText(".item", "Support pin"))
            .$(".description")
            .getText();
    }

    async refreshSupportPin() {
        await this.edit("Support pin");

        return this.getSupportPin();
    }

    async returnDescription(name: string) {
        return await element(by.cssContainingText("div.item", name)).$(".description").getText();
    }
}
