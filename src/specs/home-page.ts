import {authorization} from "../utils/authorization";
import {Page} from "../objects/pages";
import {browser} from "protractor";
import {PRODUCT_MARKERS} from "../assets";

describe("Home page", () => {
    const homePage = new Page.Home();

    beforeAll(async () => {
        await authorization.login();
    });

    describe("Filters", () => {
        describe("Personal filter", () => {
            beforeAll(async () => {
                await homePage.open();
            });

            it("should display only products with \"Domain Validation\" on selecting [personal filter]", async () => {
                await homePage.filters.personalButton.setSelected(true);
                await browser.sleep(500);

                await expect(homePage.productItem).eachToContainText(PRODUCT_MARKERS.DOMAIN_VALIDATION);
            });
        });

        describe("Business and one domain filters", () => {
            beforeAll(async () => {
                await homePage.open();
            });

            it("should display only products with Domain Validation and One Domain" +
                " on selecting [personal filter] and [one domain filter]", async () => {
                await homePage.filters.businessButton.setSelected(true);
                await homePage.filters.oneDomainButton.setSelected(true);
                await browser.sleep(500);

                await expect(homePage.productItem)
                    .eachToContainText([PRODUCT_MARKERS.ORGANIZATION_VALIDATION, PRODUCT_MARKERS.ONE_DOMAIN]);
            });
        });

        describe("Soring by price", () => {
            beforeAll(async () => {
                await homePage.open();
            });

            it("should sort product ascending by price on clicking [sort button]", async () => {
                await homePage.sortButton.click();

                await expect(homePage.productItem).toBeSortedAscendingBy(["priceInteger", "priceCent"]);
            });
        });
    });
});
