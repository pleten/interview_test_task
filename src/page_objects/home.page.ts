import { BasePage } from './'
import { HeaderFragment, HomeFilterFragment, SslItemListFragment, SslItemFragment } from './page_fragments'
import { $, $$, ElementFinder, ElementArrayFinder, browser } from 'protractor'
import { step } from '../helpers/decorator'

export class HomePage extends BasePage {
    protected url: string = ''
    private headerFragment: HeaderFragment
    private filters: ElementArrayFinder
    private filterorder: ElementFinder
    private sslItems: SslItemListFragment

    constructor() {
        super()
        this.headerFragment = new HeaderFragment()
        this.filters = $$('.heading-block .filter-item a')
        this.filterorder = $('.heading-block .sort-btn .control')
        this.sslItems = new SslItemListFragment()
    }

    public header() {
        return {
            goToLogin: async () => {
                await this.headerFragment.goToLogin()
            },
            isUserLoged: async (email: string) => {
                return this.headerFragment.isUserLoged(email)
            },
            selectFromDropdown: async (value: string) => {
                await this.headerFragment.selectFromDropdown(value)
            }
        }
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

    public order() {
        return {
            cheapest: async () => {
                const direction = await this.filterorder.$('span').getAttribute('class')
                if (direction.includes('up')) {
                    await this.filterorder.click()
                }
            },
            featured: async () => {
                const direction = await this.filterorder.$('span').getAttribute('class')
                if (direction.includes('down')) {
                    await this.filterorder.click()
                }
            }
        }
    }

    public isFiteredBy() {
        return {
            personal: async (): Promise<boolean> => {
                let isFiltered = true
                for (let i = 0; i < await this.sslItems.count(); i++) {
                    const ssl: SslItemFragment = await this.sslItems.get(i) 
                    const sslInfo = await ssl.productInfo()
                    isFiltered = isFiltered && sslInfo.name.includes('PositiveSSL')
                    if (!isFiltered) {
                        console.log('error')
                        throw RangeError(`Should be filtered by PERSONAL but SSl item ${i} is not PERSONAL`)
                    }
                }
                return isFiltered
            },
            multidomain: async (): Promise<boolean> => {
                let isFiltered = true
                for (let i = 0; i < await this.sslItems.count(); i++) {
                    const ssl: SslItemFragment = await this.sslItems.get(i) 
                    const sslInfo = await ssl.productInfo()
                    isFiltered = isFiltered && sslInfo.domain.includes('domains')
                    if (!isFiltered) {
                        console.log('error')
                        throw RangeError(`Should be filtered by MULTI-DOMAIN but SSl item ${i} is not MULTI-DOMAIN`)
                    }
                }
                return isFiltered
            },
            featured: async (): Promise<boolean> => {
                let isOrdered = true
                const firstSslItem: SslItemFragment = await this.sslItems.get(0)
                const firstSslInfo = await firstSslItem.productInfo()
                let previousSslRating = firstSslInfo.rating
                for (let i = 0; i < await this.sslItems.count(); i++) {
                    const ssl: SslItemFragment = await this.sslItems.get(i) 
                    const sslInfo = await ssl.productInfo()
                    isOrdered = isOrdered && previousSslRating >= sslInfo.rating
                    if (!isOrdered) {
                        console.log('error')
                        throw RangeError(`SSl item ${i} is not ordered by FEATURED`)
                    }
                    previousSslRating = sslInfo.rating
                }
                return isOrdered
            },
            cheapest: async (): Promise<boolean> => {
                let isOrdered = true
                const firstSslItem: SslItemFragment = await this.sslItems.get(0)
                const firstSslInfo = await firstSslItem.productInfo()
                let previousSslPrice = firstSslInfo.price
                for (let i = 0; i < await this.sslItems.count(); i++) {
                    const ssl: SslItemFragment = await this.sslItems.get(i) 
                    const sslInfo = await ssl.productInfo()
                    isOrdered = isOrdered && previousSslPrice <= sslInfo.price
                    if (!isOrdered) {
                        console.log('error')
                        throw RangeError(`SSl item ${i} is not ordered by CHEAPEST`)
                    }
                    previousSslPrice = sslInfo.price
                }
                return isOrdered
            }
        }
    }
}
