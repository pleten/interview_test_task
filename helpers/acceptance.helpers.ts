import {$, $$, browser, by, element, ExpectedConditions as EC} from 'protractor'
import {Header} from "../model/widgets/header.widget";

export class AcceptanceHelpers {

    static async seePassText() {
        return expect($("input[ng-model='form.password'][type='text']").isPresent()).toBe(true);
    }

    static async dontSeePassText() {
        return expect($("input[ng-model='form.password'][type='password']").isPresent()).toBe(true);
    }

    static async see(css: string, value: string, _browser = browser) {
        return expect(await _browser.element(by.cssContainingText(css, value)).isPresent()).toBe(true);
    }

    static async seeElement(css: string) {
        return expect(await $(css).isPresent()).toBe(true);
    }

    static async dontSeeElement(css: string) {
        return expect(await $(css).isPresent()).toBe(false);
    }

    static async seeInNotification(text: string) {
        return expect(await element(by.cssContainingText(".notification", text))
            .isPresent()).toBe(true);
    }

    static async seeInTooltipErrors(texts: any) {
        let els = await $$("div[class='left-tooltip-box']:not([class='ng-hide']) .tooltip-error");

        for (let l in els) {
            let formatedText = await els[l].getText().then(function(txt) {
                return txt.replace(/[\n\r]/g, ' ');
            });

            await expect(formatedText).toEqual(texts[l])
        }
    }

    static async seeCurrentUrl(url: string) {
        await browser.wait(EC.urlContains(url), 5000);
        return expect(await browser.getCurrentUrl()).toContain(url);
    }

    static async seeNumberOfElements(css: string, number: number) {
        return expect(await $$(css).count()).toEqual(number);
    }

    static async open(url: string) {
        await browser.get(url);
    }

    static async compareStrings(firstString: string, secondString: string, different: boolean) {
        return expect(firstString !== secondString).toBe(different);
    }

    static async deleteCache() {
        await browser.manage().deleteAllCookies();
        await browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
    }

    static async goTo(page: string) {
        let header = new Header();

        try {
            await header.choose(page);
        } catch (e) {
            await console.log("No such page: " + e)
        }
    }
}




