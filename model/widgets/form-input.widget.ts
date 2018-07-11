import {by, element} from "protractor";

export class FormInput {

    async setByModel(model: string, value: string) {
            try {
                await element(by.model(model)).clear();
                await element(by.model(model)).sendKeys(value);
            } catch (e) {
                await console.log("Error: " + e)
            }

        return this;
    }

    async setByCss(css: string, value: string) {
        try {
            await element(by.css(css)).clear();
            await element(by.css(css)).sendKeys(value);
        } catch (e) {
            await console.log("Error: " + e)
        }

        return this;
    }
}
