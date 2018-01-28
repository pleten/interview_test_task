import { BaseArrayFragment } from 'protractor-element-extend'
import { $$ } from 'protractor'
import { SslItemFragment } from './'

export class SslItemListFragment extends BaseArrayFragment<SslItemFragment> {
    constructor() {
        super($$('.ssl-item'), SslItemFragment)
    }
}
