import * as userData from "../../../../resourses/dataStorage/UserData";
import { HomePage } from "../../../../resourses/pages/HomePage";
import { AuthorizationPage } from "../../../../resourses/pages/AuthorizationPage";
import { CustomLogger } from "../../../../utils/logger/CustomLogger";
import { HeaderMenuSection } from "../../../../resourses/sections/HeaderMenuSection";
import { Preconditions } from "../../preconditions/Preconditions";
import { Postconditions } from "../../postconditions/Postconditions";
import { logoutButtonXpath } from "../../../../resourses/locators/HeaderMenuSectionLocators";

describe("Feature: Authorization.", () => {

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

    it("Authorization page (Welcome back!)", async () => {
        // *** STEPS ***        
        await homePage.openHomePage(); 
        let homePageUrl = await homePage.getPageUrl();
   
        await homePage.clickLoginButton();

        CustomLogger.logging("On the authorization page enter valid email and password for previously registered user (to check entered password, click on 'eye' icon in password field.)");        
        await authorizationPage.enterUserCredentials(userData.userEmail,
                                               userData.userPassword,
                                               true);

        let authorizationPageUrl = await authorizationPage.getPageUrl();
        let passwordFieldAttr = await authorizationPage.getPasswordFieldAttribute("type");        

        await authorizationPage.clickLogin();

        await headerMenuSection.openDropDownMenu();
        let isLogOutBtnPresented = await homePage.isElementVisible(logoutButtonXpath);

    

        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("Home page has to be opened");
        expect(homePageUrl).toBe("https://www.ssls.com/");
        
        CustomLogger.logging("Authorization page has to be opened");
        expect(authorizationPageUrl).toBe("https://www.ssls.com/authorize");

        CustomLogger.logging("After click on 'eye' icon for password field, password should be displayed");
        expect(passwordFieldAttr).toBe("text");

        CustomLogger.logging("'Log in' button has to be changed on 'User@email' button (with dropdown menu) from the left side in the Header of the page");
        expect(isLogOutBtnPresented).toBe(true);
    }); // it
}); // describe
