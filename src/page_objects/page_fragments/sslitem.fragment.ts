import { BaseFragment } from 'protractor-element-extend'
import { $, ElementFinder } from 'protractor'

export class SslItemFragment extends BaseFragment {
    private name: ElementFinder
    private rating: ElementFinder
    private domain: ElementFinder
    private price: ElementFinder

    constructor(root: ElementFinder) {
        super(root)
        this.name = this.$('.ssl-name')
        this.rating = this.$('.rating')
        this.domain = this.$$('.desc-box p').get(1)
        this.price = this.$('price:not(.base-price)')
    }   

    public async productInfo(): Promise<{name: string, rating: number, domain: string, price: number}> {
        const ratingString = await this.rating.getAttribute('class')
        const ratingNumber = parseFloat(ratingString.split('-')[1].replace('_', '.'))

        const priceString = await this.price.getAttribute('value') 
        
        return {    
            name: await this.name.getText(), 
            rating: ratingNumber, 
            domain: await this.domain.getText(), 
            price: parseInt(priceString, 10)
            }
    }
}
