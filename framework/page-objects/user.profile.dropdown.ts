import { $$, by, element, ElementFinder } from 'protractor';
import { UserProfileEditDialog } from './user.profile.edit.dialog';

export class UserProfileDropdown {
    private readonly logOutButton: ElementFinder = element(by.css('[ng-click="$ctrl.logout()"]'));

    async clickViewProfileLink(): Promise<UserProfileEditDialog> {
        const viewProfileLink = await this.getLinkByAttribute('user.profile');
        await viewProfileLink.click();
        return new UserProfileEditDialog();
    }

    async clickLogoutButton(): Promise<void> {
        await this.logOutButton.click();
    }

    async getLinkByAttribute(attribute: string): Promise<ElementFinder> {
        const dropDownItems = $$('.drop-link');
        const filteredDropDownItems = dropDownItems.filter(async filteredElement => {
            const elementAttribute = await filteredElement.getAttribute('ui-sref');
            return elementAttribute === attribute;
        });
        return filteredDropDownItems.first();
    }
}
