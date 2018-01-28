import { BaseFragment } from 'protractor-element-extend'
import { $$, ElementFinder } from 'protractor'
import { DropdownControl } from '../page_controls'
import { step } from '../../helpers/decorator'

export class HeaderFragment extends BaseFragment {
    private loginBtn: ElementFinder
    private userMenu: DropdownControl

    constructor() {
        super($$('header').get(0))
        this.userMenu = new DropdownControl(this.$('.profile-box button.round'))
        this.loginBtn = this.$('.log-box' )
    }

    @step('Open authorization page')
    public async goToLogin(): Promise<void> {
        await this.loginBtn.click()
    }

    public async selectFromDropdown(value: string) {
        await this.userMenu.set(value)
    }

    public async isUserLoged(useremail: string): Promise<boolean> {
        const email = await this.loginBtn.getText()
        return email === useremail
    }
}
