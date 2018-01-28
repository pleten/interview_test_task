import { HomePage, LoginPage } from '../../page_objects'
import { HeaderFragment } from '../../page_objects/page_fragments'
import { users } from '../../data/users'

describe('Authorization positive scenario.', function() {
    const homePage = new HomePage()
    const loginPage = new LoginPage()
    const header = new HeaderFragment()

    beforeAll(async () => {
        await homePage.start()
    })

    it('Log in', async () => {
        const validUser = users.valid
        await homePage.header().goToLogin()
        await loginPage.setCredantials(validUser)
        await loginPage.showPassword()
        expect(await loginPage.isPasswordShowen()).toBeTruthy('Password should be visible')
        await loginPage.submit()
        expect(await homePage.header().isUserLoged(validUser.email))
        .toBeTruthy(`User should be logged as ${validUser.email}`)
    })

    it('Log Out', async () => {
        await homePage.header().selectFromDropdown('Log out')
        expect(await loginPage.isLoaded()).toBeTruthy('Login page has not been loaded')
    })
})
