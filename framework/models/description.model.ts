export class Description {
    brand: string;
    domains: string;
    secureArea: string;
    validation: string;
    assurance: string;

    constructor(brand: string, domains: string, secureArea: string, validation: string, assurance: string) {
        this.brand = brand;
        this.domains = domains;
        this.secureArea = secureArea;
        this.validation = validation;
        this.assurance = assurance;
    }

    toJSON() {
        return {
            brand: this.brand,
            domains: this.domains,
            secureArea: this.secureArea,
            validation: this.validation,
            assurance: this.assurance,
        };
    }
}
