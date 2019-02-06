import { $, ElementFinder } from 'protractor';

export class UserProfileEditDialog {
    private readonly userNamePropertyName = 'Name';
    private readonly userEmailPropertyName = 'Email';
    private readonly userPasswordPropertyName = 'Password';
    private readonly userPhonePropertyName = 'Phone';
    private readonly userAddressPropertyName = 'Address';
    private readonly userSupportPinPropertyName = 'Support pin';
    private readonly userNewsletterPinPropertyName = 'Newsletter';
    private readonly userProfileCssSelector = '.profile-content';
    private readonly rowCssSelector = '.item';
    private readonly rowNameCssSelector = '.terms';
    private readonly rowValueCssSelector = '.description';
    private readonly rowButtonCssSelector = '.btn.square.flat-dark';
    private readonly rowToggleButtonCssSelector = '.toggle-btn';

    async getName(): Promise<string> {
        return this.getRowText(this.userNamePropertyName);
    }
    async getEmail(): Promise<string> {
        return this.getRowText(this.userEmailPropertyName);
    }
    async getPassword(): Promise<string> {
        return this.getRowText(this.userPasswordPropertyName);
    }
    async getPhone(): Promise<string> {
        return this.getRowText(this.userPhonePropertyName);
    }
    async getAddress(): Promise<string> {
        return this.getRowText(this.userAddressPropertyName);
    }

    async getPin(): Promise<string> {
        return this.getRowText(this.userSupportPinPropertyName);
    }

    async resetPin(): Promise<void> {
        return this.clickRowEditButton(this.userSupportPinPropertyName);
    }

    async getNewsletterSubscriptionStatus(): Promise<boolean> {
        const row: ElementFinder = await this.getDataRowByName(this.userNewsletterPinPropertyName);
        return (await row
            .$(this.rowValueCssSelector)
            .$(this.rowToggleButtonCssSelector)
            .getAttribute('class')).includes('on');
    }

    async getDataRowByName(name: string): Promise<ElementFinder> {
        return $(this.userProfileCssSelector)
            .$$(this.rowCssSelector)
            .filter(async item => {
                return (await item.$(this.rowNameCssSelector).getText()).includes(name);
            })
            .first();
    }

    async getRowText(name: string): Promise<string> {
        const row: ElementFinder = await this.getDataRowByName(name);
        return row.$(this.rowValueCssSelector).getText();
    }

    async clickRowEditButton(name: string): Promise<void> {
        const row: ElementFinder = await this.getDataRowByName(name);
        return row.$(this.rowButtonCssSelector).click();
    }
}
