let HomePage = function() {

    this.certListPage = element(by.css('.cert-list-page'));
    this.filterButton = function (name, state /*active or notActive*/) {
        let st = "";
        if (state === "active") {
            st = `[contains(@class, "active")]`;
        } else if (state === "notActive") {
            st = `[not(contains(@class, "active"))]`;
        }
        return element.all(by.xpath(`//*[contains(@class, "filter-item")]/a[contains(., "${name}")]${st}`));
    };
    this.personalSslItem = element.all(by.css('.cert-list .dv-item'));
    this.multiDomainSslItem = element.all(by.xpath('//*[contains(@class, "ssl-item")][contains(.,"domains")][not(contains(.,"subdomains"))]'));
    this.anySslItem = element.all(by.css('.ssl-item'));
};
module.exports = new HomePage();