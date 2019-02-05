import { $$, by, element } from 'protractor';
import { UserProfileEditDialog } from './user.profile.edit.dialog';

export class UserProfileDropdown {
    private readonly logOutButton = element(by.css('[ng-click="$ctrl.logout()"]'));

    async clickViewProfileLink() {
        const viewProfileLink = await this.getLinkByAttribute('user.profile');
        await viewProfileLink.click();
        return new UserProfileEditDialog();
    }

    async clickLogoutButton() {
        await this.logOutButton.click();
    }

    async getLinkByAttribute(attribute) {
        const dropDownItems = $$('.drop-link');
        const filteredDropDownItems = dropDownItems.filter(async filteredElement => {
            const elementAttribute = await filteredElement.getAttribute('ui-sref');
            return elementAttribute === attribute;
        });
        return filteredDropDownItems.first();
    }
}
