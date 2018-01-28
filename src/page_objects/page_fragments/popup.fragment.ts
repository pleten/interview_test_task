import { $, browser, ElementFinder, ExpectedConditions as EC } from 'protractor'
import { BaseFragment } from 'protractor-element-extend'
import { takeScreenshot } from '../../helpers/screenshot'
import { step } from '../../helpers/decorator'
declare const angular: any

export class PopupFragment extends BaseFragment {

    constructor(root: ElementFinder = $('#noty_topCenter_layout_container')) {
        super(root)
    }

    @step('Fetch warning message')
    public async getMessage(): Promise<string> {
        await browser.wait(async () => {
            const size = await this.getSize()
            return size.height > 60
        }, 6000, 'Popup has not appeared')
        await takeScreenshot('Warning popup')
        return this.getText()
    }
}
