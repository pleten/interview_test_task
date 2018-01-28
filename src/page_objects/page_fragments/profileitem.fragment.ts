import { BaseFragment } from 'protractor-element-extend'
import { $, ElementFinder } from 'protractor'

export class ProfileItemFragment extends BaseFragment {
    private name: ElementFinder
    private description: ElementFinder
    private editBtn: ElementFinder

    constructor(root: ElementFinder) {
        super(root)
        this.name = this.$('.terms')
        this.description = this.$('.description')
        this.editBtn = this.$('button')
    }

    public async getName(): Promise<string> {
        return this.name.getText()
    }

    public async getDescription(): Promise<string> {
        return this.description.getText()
    }

    public async edit(): Promise<void> {
        await this.editBtn.click()
    }
}
