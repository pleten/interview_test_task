import { takeScreenshot } from './../helpers/screenshot'
import { $, browser, ElementFinder, ExpectedConditions as EC} from 'protractor'
import { BasePage } from './base.page'
import { InputControl } from './page_controls'
import { IUser } from '../data/users'
import { TooltipFragment } from './page_fragments/'
import { step } from '../helpers/decorator'

export class LoginPage extends BasePage {
    protected url: string = '/authorize'
    private email: InputControl
    private password: InputControl
    private eye: ElementFinder
    private loginBtn: ElementFinder
    private emailTooltip: TooltipFragment
    private passwordTooltip: TooltipFragment

    constructor(root: ElementFinder = $('.authorization-page')) {
        super()
        this.email = new InputControl(root.$('.email-box [name="email"]'))
        this.password = new InputControl(root.$('.email-box [name="password"]'))
        this.eye = root.$('button.btn-input-block') 
        this.loginBtn = root.$('button.primary')
        this.emailTooltip = new TooltipFragment(root.$('div.email'))
        this.passwordTooltip = new TooltipFragment(root.$('div.form-group:not(.email)'))
    }

    public async open() {
        await super.start()
    }

    @step('Enter user credantials')
    public async setCredantials({email, password}: IUser) {
        await this.email.set(email)
        await this.password.set(password)
    }

    @step('Show password')
    public async showPassword() {
        await this.eye.click()
        await takeScreenshot('showed password')
    }

    @step('Click login button')
    public async submit() {
        await this.loginBtn.click()
    }

    public async login({email, password}: IUser) {
        await this.setCredantials({email, password})
        await this.submit()
    }

    public tooltipMessage() {
        return {
            email: async () => {
                return this.emailTooltip.getMessage()
            },
            password: async () => {
                return this.passwordTooltip.getMessage()
            }
        }
    }

    public async isPasswordShowen() {
        const attribute = await this.password.getAttribute('type')
        return attribute === 'text'
    }

    public async isLoaded(): Promise<boolean> {
        return browser.wait(async () => 
            await EC.and(EC.elementToBeClickable(this.loginBtn), EC.urlContains(this.url))(), 
            2000)
    }
}
