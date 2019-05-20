import { CustomLogger } from "../../../../utils/logger/CustomLogger";
import * as userData from "../../../../resourses/dataStorage/UserData";
import { HeaderMenuSection } from "../../../../resourses/sections/HeaderMenuSection";
import { ViewProfilePage } from "../../../../resourses/pages/ViewProfilePage";
import { HomePage } from "../../../../resourses/pages/HomePage";
import { Preconditions } from "../../preconditions/Preconditions";
import { Postconditions } from "../../postconditions/Postconditions";


describe("Feature: Profiles.", () => {
    // Pages 
    let homePage = new HomePage();

    let headerMenuSection = new HeaderMenuSection();
    let viewProfilePage = new ViewProfilePage();

    beforeEach(async () => {        
        await new Preconditions().setUpBefore();
    }); // beforeEach

    afterEach(async () => {
		await new Postconditions().setUpAfter();
	});  // afterEach

    it("My profile page. Refresh support pin.", async () => {
        // *** STEPS ***
        CustomLogger.logging("Precondition:");
        CustomLogger.logging("User has to be logged in");
        await homePage.openHomePage(); 
        await headerMenuSection.loginUser(userData.userEmail, userData.userPassword); 

        
        CustomLogger.logging("Steps:");
        CustomLogger.logging("Click on triangle near the \"User@email\" button");
        CustomLogger.logging("In drop-down menu select \"View profile\"");
        await headerMenuSection.openDropDownMenu();
        await headerMenuSection.clickDropDownMenuItem("//a[.='View profile']");

        let oldPinFieldValue: string = await viewProfilePage.getElementText("(//div[@class='description']/span)[6]");

        CustomLogger.logging("Click \"Update\" button in “support pin field” to re-generation a new support pin");
        await viewProfilePage.clickElement("//button[@name='supportPin']");

        let newPinFieldValue: string = await viewProfilePage.getElementText("(//div[@class='description']/span)[6]")

        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("After click on “Update” button, support pin should be updated.");
        expect(newPinFieldValue).not.toBe(oldPinFieldValue);
    });
});
