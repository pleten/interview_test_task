import { CustomLogger } from "../../../../utils/logger/CustomLogger";
import * as userData from "../../../../resourses/dataStorage/UserData";
import { HomePage } from "../../../../resourses/pages/HomePage";
import { AuthorizationPage } from "../../../../resourses/pages/AuthorizationPage";
import { Preconditions } from "../../preconditions/Preconditions";
import { Postconditions } from "../../postconditions/Postconditions";


describe("Feature: Authorization.", () => {
    // Pages 
    let homePage = new HomePage();
    let authorizationPage = new AuthorizationPage();

    beforeEach(async () => {
        await new Preconditions().setUpBefore();
    }); // beforeEach

    afterEach(async () => {
		await new Postconditions().setUpAfter();
	});  // afterEach

    it("Authorization page. Invalid email", async () => {
        // *** STEPS ***
        await homePage.openHomePage(); 
        let homePageUrl = await homePage.getPageUrl();

        await homePage.clickLoginButton();
        let authorizationPageUrl = await authorizationPage.getPageUrl();
        
        await authorizationPage.enterUserCredentials(userData.userEmailInvalid,
                                                     userData.userPassword,
                                                     true); 
        let passwordFieldAttr = await authorizationPage.getPasswordFieldAttribute("type");        
        
        await authorizationPage.clickLogin(); 
        let invalidEmailErrorText = await authorizationPage.getInvalidEmailErrorText();
    
        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("Home page has to be opened");
        expect(homePageUrl).toBe("https://www.ssls.com/");

        CustomLogger.logging("Authorization page has to be opened");
        expect(authorizationPageUrl).toBe("https://www.ssls.com/authorize");

        CustomLogger.logging("After click on 'eye' icon in password field, password should be displayed");
        expect(passwordFieldAttr).toBe("text");

        CustomLogger.logging("If user filled 'Email' field with non-email value (eg. test@@test.com) error message \
                              such as: “Uh oh! This isn’t an email should be displayed”");
        expect(invalidEmailErrorText).toBe(userData.errorTextInvalidEmail);                                  
    }); // it
}); // describe
