import {AcceptanceHelpers as I} from "../../helpers/acceptance.helpers"
import {FormInput} from "../widgets/form-input.widget";
import {HomePage} from "./home.page";
import {$, by, element} from "protractor";

let input = new FormInput();

export class LoginPage {

    url: string = "/authorize";

    async login(user: string, pass?: string, eye?: boolean) {
        try {
            await input.setByModel("form.email", require("../../data/passwords.json")[user].email);
        } catch {
            await input.setByModel("form.email", user);
        }

        if (pass) {
            await input.setByModel("form.password", pass);
        } else if (pass == "") {
            await input.setByModel("form.password", pass);
        } else {
            await input.setByModel("form.password", require("../../data/passwords.json")[user].pass);
        }

        await I.dontSeePassText();

        let eyeOn = await $(".icon-eye").isPresent();
        if (eye && eyeOn) {
            await $(".icon-eye").click();
            await I.seePassText();
        }

        await element(by.buttonText("Login")).click();

        return new HomePage();
    }
}
