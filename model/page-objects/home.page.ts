import {by, element} from "protractor";

export class HomePage  {

    url: string = "/";
    sslItem: string = ".ssl-item";

    async filter(name: string) {
        await element(by.cssContainingText(".filter-item", name)).click();

        return this;
    }
}
