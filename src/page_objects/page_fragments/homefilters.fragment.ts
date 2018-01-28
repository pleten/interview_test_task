import { BaseFragment } from 'protractor-element-extend'
import { $, $$, ElementFinder, ElementArrayFinder } from 'protractor'
export class HomeFilterFragment extends BaseFragment {
    private filters: ElementArrayFinder

    constructor(root: ElementFinder = $('.heading-block')) {
        super(root)
        this.filters = this.$$('.filter-item a')
    }

    public async filter(name: string) {
        for (const filter of await this.filters) {
            const filterName = await filter.getText()
            if (filterName === name) {
                await filter.click()
                return
            }
        }
    }
}
