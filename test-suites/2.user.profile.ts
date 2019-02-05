import { NavigationController } from '../framework/controllers/navigation.controller';
import { UserController } from '../framework/controllers/user.controller';
import { User } from '../framework/models/user.model';

describe('user.profile', () => {
    const testUser = new User('ssls.automation+5@gmail.com', '123456');

    it(`6. My profile page. Client area`, async () => {
        await NavigationController.login({ user: testUser });
        const actualUser: User = await UserController.getProfile();
        console.log(actualUser);
        await NavigationController.logout();
        await NavigationController.login({ user: testUser });
        const expectedUser = await UserController.getProfile();
        console.log(expectedUser);
        await NavigationController.logout();
        expect(actualUser).toEqual(expectedUser);
    });

    it(`7. My profile page. Refresh support pin`, async () => {
        await NavigationController.login({ user: testUser });
        const oldPinUser: User = await UserController.getProfile();
        await UserController.resetSupportPin();
        const newPinUser: User = await UserController.getProfile();
        await NavigationController.logout();
        expect(oldPinUser.supportPin).not.toBe(newPinUser.supportPin);
    });
});
