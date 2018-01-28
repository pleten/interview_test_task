import { BaseArrayFragment } from 'protractor-element-extend'
import { $$ } from 'protractor'
import { ProfileItemFragment } from './'

export class ProfileItemListFragment extends BaseArrayFragment<ProfileItemFragment> {
    constructor() {
        super($$('[name="form"] .item'), ProfileItemFragment)
    }
}
