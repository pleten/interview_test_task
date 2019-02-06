import { User } from '../models/user.model';
import { HomePage } from '../page-objects/home.page';
import { ConsoleLog } from '../reporters/console.log';

export class UserController {
    static async getProfile(): Promise<User> {
        const user = new User('', '');
        const userProfileDropdown = await new HomePage().openUserProfileDropdown();
        const userProfileEditDialog = await userProfileDropdown.clickViewProfileLink();
        user.name = await userProfileEditDialog.getName();
        user.email = await userProfileEditDialog.getEmail();
        user.password = await userProfileEditDialog.getPassword();
        user.phone = await userProfileEditDialog.getPhone();
        user.address = await userProfileEditDialog.getAddress();
        user.supportPin = await userProfileEditDialog.getPin();
        user.isNewsletterEnabled = await userProfileEditDialog.getNewsletterSubscriptionStatus();
        ConsoleLog.trace(`Get user profile from the website:`);
        console.log(user);
        return user;
    }

    static async resetSupportPin(): Promise<string> {
        const userProfileDropdown = await new HomePage().openUserProfileDropdown();
        const userProfileEditDialog = await userProfileDropdown.clickViewProfileLink();
        await userProfileEditDialog.resetPin();
        const newPin = await userProfileEditDialog.getPin();
        ConsoleLog.trace(`Reset the user support pin, new pin is [${newPin}]`);
        return newPin;
    }
}
