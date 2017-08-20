import { protractor, ProtractorExpectedConditions, ElementFinder } from 'protractor';

export class AbstractPage {

    public static getEC(): ProtractorExpectedConditions {
        return protractor.ExpectedConditions;
    }

    public static sendQuery(field: ElementFinder, query: string): any {
        field.clear().then(() => {
            field.sendKeys(query);
        });
    }
}
