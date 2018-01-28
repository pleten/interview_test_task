import { LoginPage, HomePage, ProfilePage, IProfile } from '../../page_objects'
import { users } from '../../data/users'

describe('Profile page', () => {
    const loginPage = new LoginPage()
    const homePage = new HomePage()
    const profilePage = new ProfilePage()
    const profileFieldsToSave: IProfile = {
        name: '',
        email: '',
        phone: '',
        address: '',
        pin: ''
    }
    const pin: IProfile = {
        pin: ''
    }
    let profileData = {}

    beforeAll(async() => {
        await homePage.header().selectFromDropdown('View profile')
        await profilePage.isLoaded()
        profileData = await profilePage.grapInfo(profileFieldsToSave)
    })

    it('Save profile data', async () => {
        const saveFromTest = await profilePage.grapInfo(profileFieldsToSave)
        expect(profileData).toEqual(saveFromTest, 'Some data missed')
    })

    it('Refresh support pin', async () => {
        const pinold = await profilePage.grapInfo(pin)
        await profilePage.editField('Support pin')
        const pinnew = await profilePage.grapInfo(pin)
        expect(pinold).not.toEqual(pinnew, 'Pin has not been refrashed')
    })
})
