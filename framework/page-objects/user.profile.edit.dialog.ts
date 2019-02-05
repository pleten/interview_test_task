import { $ } from 'protractor';

export class UserProfileEditDialog {
    async getName() {
        return this.getRowText('Name');
    }
    async getEmail() {
        return this.getRowText('Email');
    }
    async getPassword() {
        return this.getRowText('Password');
    }
    async getPhone() {
        return this.getRowText('Phone');
    }
    async getAddress() {
        return this.getRowText('Address');
    }

    async getPin() {
        return this.getRowText('Support pin');
    }

    async resetPin() {
        return this.clickRowEditButton('Support pin');
    }

    async getNewsletterSubscriptionStatus() {
        const row = await this.getDataRowByName('Newsletter');
        return (await row
            .$('.description')
            .$('.toggle-btn')
            .getAttribute('class')).includes('on');
    }

    async getDataRowByName(name) {
        return $('.profile-content')
            .$$('.item')
            .filter(async item => {
                return (await item.$('.terms').getText()).includes(name);
            })
            .first();
    }

    async getRowText(name) {
        const row = await this.getDataRowByName(name);
        return row.$('.description').getText();
    }

    async clickRowEditButton(name) {
        const row = await this.getDataRowByName(name);
        return row.$('.btn.square.flat-dark').click();
    }
}
