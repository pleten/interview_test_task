import { HomePage, LoginPage } from '../../page_objects'
import { users } from '../../data/users'
import { filter } from '../../data/filters'

describe('Home page.', function() {
    const homePage = new HomePage()
    const loginPage = new LoginPage()

    beforeAll(async () => {
        await loginPage.open()
        await loginPage.login(users.valid)
    })

    it('Featured ssl items order', async () => {
        expect(await homePage.isFiteredBy().featured()).toBeTruthy()
    })

    it('Cheapest ssl items order', async () => {
        await homePage.order().cheapest()
        expect(await homePage.isFiteredBy().cheapest()).toBeTruthy()
    })

    it('Filter ssl by Personal', async () => {
        await homePage.filter(filter.personal)
        expect(await homePage.isFiteredBy().personal()).toBeTruthy()
    })

    it('Filter ssl by Personal and Multi-Domain', async () => {
        await homePage.filter(filter.multidomain)
        expect(await homePage.isFiteredBy().personal()).toBeTruthy()
        expect(await homePage.isFiteredBy().multidomain()).toBeTruthy()
    }) 
})
