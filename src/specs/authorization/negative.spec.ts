import { HomePage, LoginPage } from '../../page_objects'
import { PopupFragment } from '../../page_objects/page_fragments'
import { users } from '../../data/users'
import { warnings } from './../../data/warnings'

describe('Authorization negative scenarios.', function() {
    const homePage = new HomePage()
    const loginPage = new LoginPage()
    const popup = new PopupFragment()

    beforeAll(async () => {
        await homePage.start()
        await homePage.header().goToLogin()
    })

    it('Not registered user', async () => {
        await loginPage.setCredantials(users.notregistered)
        await loginPage.showPassword()
        expect(await loginPage.isPasswordShowen()).toBeTruthy('Password should be visible')
        await loginPage.submit()
        expect(await popup.getMessage()).toMatch(warnings.emailpassword, 'Warning is incorect')
    })

    it('Invalid email', async () => {
        await loginPage.setCredantials(users.invalidemail)
        expect(await loginPage.tooltipMessage().email()).toMatch(warnings.invalidemail)
    })

    it('Empty fields', async () => {
        await loginPage.refreshPage()
        await loginPage.submit()
        expect(await loginPage.tooltipMessage().email()).toMatch(warnings.emptyemail)
        expect(await loginPage.tooltipMessage().password()).toMatch(warnings.emptypassword)
    })
})
