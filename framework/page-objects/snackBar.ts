import { $, browser, protractor } from 'protractor';

export class SnackBar {
    private readonly errorSnackBar = $('.noty_type_error');
    private readonly infoSnackBar = $('.noty_type_information');

    async tryGetErrorSnack() {
        let snack = '';
        try {
            await this.waitForSnackBarEnabled(this.errorSnackBar);
            snack = await this.errorSnackBar.$('.noty_text').getText();
        } catch (error) {}
        return snack;
    }

    async tryGetInfoSnack() {
        let snack = '';
        try {
            await this.waitForSnackBarEnabled(this.infoSnackBar);
            snack = await this.infoSnackBar.$('.noty_text').getText();
        } catch (error) {}
        return snack;
    }

    async waitForSnackBarEnabled(snackBar, timeOut = 3000) {
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.presenceOf(snackBar), timeOut);
    }
}
