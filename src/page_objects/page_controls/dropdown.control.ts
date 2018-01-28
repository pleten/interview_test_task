import { BaseFragment } from 'protractor-element-extend'
import { IControl } from './'
import { $, $$, browser, ElementFinder, ElementArrayFinder, ExpectedConditions as EC, by } from 'protractor'

export class DropdownControl extends BaseFragment implements IControl {
    private list: ElementFinder
    private item: ElementArrayFinder

    constructor(root: ElementFinder) {
        super(root)
        this.list = this.element(by.xpath('../ul'))
        this.items = this.list.$$('li.drop-item')
    }

    public async set(value: string) {
        await this.click()
        await browser.wait(EC.visibilityOf(this.list), 1000)
        return this.select(value)
    }

    public async get() {
        //
    }

    public async select(value: string) {
        for (const item of await this.items) {
            const itemText = await item.getText()
            if (itemText.includes(value)) {
                await item.$('[class*="drop"]:not(span)').click()
                return
            }
        }
    }
}
