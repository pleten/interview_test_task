import { BasePage } from './'
import { $$, $, browser, ElementArrayFinder, ElementFinder, ExpectedConditions as EC } from 'protractor'
import { ProfileItemFragment , ProfileItemListFragment } from './page_fragments'

export class ProfilePage extends BasePage {
    protected url: string = '/user/profile'
    private form: ElementFinder
    private name: ElementFinder
    private email: ElementFinder
    private password: ElementFinder
    private phone: ElementFinder
    private address: ElementFinder
    private pin: ElementFinder
    private newsletter: ElementFinder
    private fields: ElementArrayFinder
    private itemList: ProfileItemListFragment

    constructor() {
        super()
        this.itemList = new ProfileItemListFragment()
    }

    public async grapInfo(fields: IProfile): Promise<IProfile> {
        const profileData = {}
        for (const key of Reflect.ownKeys(fields)) {
            for (let i = 0; i < await this.itemList.count(); i++) {
                const item: ProfileItemFragment = await this.itemList.get(i)
                const itemName = await item.getName()
                if (itemName.toLowerCase().includes(key.toString())) {
                    profileData[key] = await item.getDescription()
                }
            }
        }
        return profileData
    }

    public async editField(name: string) {
        for (let i = 0; i < await this.itemList.count(); i++) {
            const item: ProfileItemFragment = await this.itemList.get(i)
            const itemName = await item.getName()
            if (itemName.includes(name)) {
                await item.edit()
                return
            }
        }
    }

    public async isLoaded() {
        return browser.wait(EC.urlContains(this.url), 2000, 'Profile page has not been loaded')
    }
}

export interface IProfile {
    name?: string
    email?: string
    phone?: string
    address?: string
    pin?: string
}
