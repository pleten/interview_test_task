export class Promo {
    isHot: boolean;
    isSale: boolean;

    constructor(isHot: boolean, isSale: boolean) {
        this.isHot = isHot;
        this.isSale = isSale;
    }

    toJSON() {
        return {
            isHot: this.isHot,
            isSale: this.isSale,
        };
    }
}
