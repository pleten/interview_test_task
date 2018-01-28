import { BaseFragment } from 'protractor-element-extend'
import { IControl } from './'
import { browser, ElementFinder } from 'protractor'

export class InputControl extends BaseFragment implements IControl {
    private input: ElementFinder

    constructor(inputElementFinder: ElementFinder) {
        super(inputElementFinder)
        this.input = inputElementFinder
    }

    public async set(value: string) {
        await this.input.clear()
        await this.input.sendKeys(value)
    }

    public async get() {
        return browser.executeScript('return arguments[0].value', this.input)
    }
}
