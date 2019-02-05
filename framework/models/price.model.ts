export class Price {
    value: number;
    currency: string;
    units: string;

    constructor(value: number, currency: string, units: string) {
        this.value = value;
        this.currency = currency;
        this.units = units;
    }

    toJSON() {
        return {
            value: this.value,
            currency: this.currency,
            units: this.units,
        };
    }
}
