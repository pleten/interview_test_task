import {$, by} from "protractor";

export class Dropdown {

    async selectByCss(containerWay: string, value: string, container = ".dropdown") {
         await $(containerWay).click();
         await $(container).element(by.cssContainingText('li *', value)).click();

        return this;
    }
}
