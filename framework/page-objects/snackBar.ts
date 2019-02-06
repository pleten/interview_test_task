import { $, browser, ElementFinder, protractor } from 'protractor';

export class SnackBar {
    private readonly errorSnackBar = $('.noty_type_error');
    private readonly infoSnackBar = $('.noty_type_information');

    async tryGetErrorSnack(): Promise<string> {
        let snack = '';
        try {
            await this.waitForSnackBarEnabled(this.errorSnackBar);
            snack = await this.errorSnackBar.$('.noty_text').getText();
        } catch (error) {}
        return snack;
    }

    async tryGetInfoSnack(): Promise<string> {
        let snack = '';
        try {
            await this.waitForSnackBarEnabled(this.infoSnackBar);
            snack = await this.infoSnackBar.$('.noty_text').getText();
        } catch (error) {}
        return snack;
    }

    async waitForSnackBarEnabled(snackBar: ElementFinder, timeOut = 5000): Promise<void> {
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.presenceOf(snackBar), timeOut);
    }
}
