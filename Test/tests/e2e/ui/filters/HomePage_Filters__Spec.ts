import { by } from "protractor";
import { CustomLogger } from "../../../../utils/logger/CustomLogger";
import { HomePage } from "../../../../resourses/pages/HomePage";
import { Preconditions } from "../../preconditions/Preconditions";
import { Postconditions } from "../../postconditions/Postconditions";

describe("Feature: Filters.", () => {
    // Pages 
    let homePage = new HomePage();

    beforeEach(async () => {
        await new Preconditions().setUpBefore();
    }); // beforeEach

    afterEach(async () => {
		await new Postconditions().setUpAfter();
	});  // afterEach

    it("Home page. Filters", async () => {
        // *** STEPS ***
        CustomLogger.logging("Preconditions:");
        CustomLogger.logging("Home page should be opened");
        await homePage.openHomePage();
        
        CustomLogger.logging("Steps:");
        CustomLogger.logging("Click on \"Personal\" filter button");
        await homePage.clickFilters("//div[@class='filter-item']/a[contains(text(), 'Personal')]");
        let filteredSslProductsList = homePage.getElements("//div[contains(@class, 'ssl-item')]");

        
        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("List of SSL certificates after clicking on “Personal” filter \
                              should contain only product cards with “Domain Validation”");
        for (let elementIndex = 0; elementIndex < await filteredSslProductsList.count(); elementIndex++) {
            const filteredSslItem = filteredSslProductsList.get(elementIndex).getWebElement();
            // Domain
            let productDomainValidationText = await filteredSslItem.findElement(by.xpath("//p[contains(text(),'Domain validation')]")).getText();
            expect(productDomainValidationText).toBe("Domain validation");
        }

        CustomLogger.logging("Postconditions:");
        CustomLogger.logging("Unclick “Personal” filter");
        await homePage.clickFilters("//div[@class='filter-item']/a[contains(text(), 'Personal')]");

        // *** STEPS ***
        CustomLogger.logging("Preconditions:");
        CustomLogger.logging("Home page should be opened");

        CustomLogger.logging("Steps:");
        CustomLogger.logging("Click on \"Business\" and “One domain” filter buttons");
        await homePage.clickFilters("//div[@class='filter-item']/a[contains(text(), 'Business')]",
                                    "//div[contains(@class,'filter-item')]/a[contains(text(), 'one domain')]");
        filteredSslProductsList = homePage.getElements("//div[contains(@class, 'ssl-item')]");

        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("List of SSL certificates after clicking on “Business”  and “One domain” filters should contain product cards with “Organization Validation” and “1 domain”");

        for (let elementIndex = 0; elementIndex < await filteredSslProductsList.count(); elementIndex++) {
            const filteredSslItem = filteredSslProductsList.get(elementIndex).getWebElement();
            // Domain
            let productOrganizationValidationText = await filteredSslItem.findElement(by.xpath("//p[contains(text(), 'Organization validation')]")).getText();  // //div[@class="ssl-content"]//p[contains(text(), 'Organization validation')]
            let productOneDomainText = await filteredSslItem.findElement(by.xpath("//p[contains(text(),'1 domain')]")).getText();

            expect(productOrganizationValidationText).toBe("Organization validation");
            expect(productOneDomainText).toBe("1 domain");
        }
        
        CustomLogger.logging("Postconditions:");
        CustomLogger.logging("Unclick \"Business\" and “One domain” filter buttons");

        await homePage.clickFilters("//div[@class='filter-item']/a[contains(text(), 'Business')]",
                                    "//div[contains(@class,'filter-item')]/a[contains(text(), 'one domain')]");        

        // *** STEPS ***
        CustomLogger.logging("Preconditions:");
        CustomLogger.logging("Home page should be opened");

        CustomLogger.logging("Steps:");
        CustomLogger.logging("Click on \"Cheapest/Featured\" filter button to sort products by price (“Featured” should be displayed)");

        await homePage.clickElement("//a[@class='btn block round control ng-scope']");

        let ascSortButtonText = await homePage.getElementText("//a[@class='btn block round control ng-scope']");
        let allProductsPrices = await homePage.getProductsPrices();

        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("List of SSL certificates after clicking on “Cheapest/Featured”  filter should be sorted by price ascending");    
        expect(ascSortButtonText).toBe("FEATURED");

        for (let index = 1; index < allProductsPrices.length; index++) {
            const currentPrice = parseFloat(allProductsPrices[index]);
            const previousPrice = parseFloat(allProductsPrices[index - 1]);
            expect(currentPrice).toBeGreaterThanOrEqual(previousPrice);
        }
    }); // it
});
