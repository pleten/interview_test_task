import { BaseFragment } from 'protractor-element-extend'
import { $, ElementFinder } from 'protractor'
import { step } from '../../helpers/decorator'
import { attachDataToReport } from '../../helpers/helper'

export class TooltipFragment extends BaseFragment {
    constructor(root: ElementFinder) {
        super(root)
        this.tooltip = root.$('div.left-tooltip-box:not(.ng-hide)')
    }

    @step('Fetch message from tooltip')
    public async getMessage(): Promise<string> {
        const tooltipText = await this.tooltip.getText()
        const text = tooltipText.replace(/\n/, ' ')
        await attachDataToReport(`Tooltip message`, text, true)
        return text
    }
}
