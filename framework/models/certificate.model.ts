import { Description } from './description.model';
import { Price } from './price.model';
import { Promo } from './promo.model';

export class Certificate {
    name: string;
    rating: number;
    promo: Promo;
    currentPrice: Price;
    oldPrice: Price;
    description: Description;

    toJSON() {
        return {
            name: this.name,
            rating: this.rating,
            promo: this.promo,
            currentPrice: this.currentPrice,
            oldPrice: this.oldPrice,
            description: this.description,
        };
    }
}
