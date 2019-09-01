const {I} = inject();

module.exports = {

    url: '/',
    filterNames: {
        personal: 'Personal',
        business: 'Business',
        oneDomain: 'one domain'
    },

    filterRoot: '.filter-box',
    sortButton: '.sort-btn a',
    certListRoot: '.cert-list',
    certItemDescription: '.desc-box',

    clickOnFilterByNames(names, unclick = false) {
        within(this.filterRoot, () => {
            for (name of names) {
                I.click(name);
            }
            if (!unclick) {
                I.seeNumberOfElements('.btn.active', names.length)
            }
        });
    },

    async grabCertDescription() {
        let descriptions;
        I.waitForElement(this.certListRoot);
        await within(this.certListRoot, async () => {
            descriptions = await I.grabTextFrom(this.certItemDescription);
        });
        return descriptions;
    },

    async grabCertPrices() {
        let prices;
        I.waitForElement(this.certListRoot);
        await within(this.certListRoot, async () => {
            prices = await I.grabAttributeFrom('price.lg-price', 'value');
        });
        return prices;
    }
};
