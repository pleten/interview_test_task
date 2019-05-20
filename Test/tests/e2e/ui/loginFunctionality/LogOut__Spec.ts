import { CustomLogger } from "../../../../utils/logger/CustomLogger";
import { HomePage } from "../../../../resourses/pages/HomePage";
import { AuthorizationPage } from "../../../../resourses/pages/AuthorizationPage";
import { HeaderMenuSection } from "../../../../resourses/sections/HeaderMenuSection";
import { Preconditions } from "../../preconditions/Preconditions";
import * as userData from "../../../../resourses/dataStorage/UserData";
import { Postconditions } from "../../postconditions/Postconditions";


describe("Feature: Login functionality.", () => {
    // Pages 
    let homePage = new HomePage();
    let authorizationPage = new AuthorizationPage();
    let headerMenuSection = new HeaderMenuSection();

    beforeEach(async () => {
        await new Preconditions().setUpBefore();
    }); // beforeEach

    afterEach(async () => {
		await new Postconditions().setUpAfter();
	});  // afterEach

    it("Log Out", async () => {
        // *** STEPS ***
        CustomLogger.logging("Preconditions:");
        CustomLogger.logging("User has to be logged in");
        await homePage.openHomePage(); 
        await headerMenuSection.loginUser(userData.userEmail, userData.userPassword);
        
        CustomLogger.logging("Steps:");
        CustomLogger.logging("Click on triangle near the \"User@email\" button and select “Log out”");
        await headerMenuSection.openDropDownMenu();
        await headerMenuSection.clickDropDownMenuItem("//button[. = 'Log out']");

        let isLoginBtnVisible = await headerMenuSection.isLoginButtonVisible();
        let authorizationPageUrl = await authorizationPage.getPageUrl();

        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("After click \"Log out\" user should log out and  redirected on authorization page (https://www.ssls.com/authorize)");
        expect(isLoginBtnVisible).toBe(true);
        expect(authorizationPageUrl).toBe("https://www.ssls.com/authorize");
    });  // it
});  // describe
