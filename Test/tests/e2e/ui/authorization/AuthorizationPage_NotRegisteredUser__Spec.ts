import { AuthorizationPage } from "../../../../resourses/pages/AuthorizationPage";
import { HomePage } from "../../../../resourses/pages/HomePage";
import { CustomLogger } from "../../../../utils/logger/CustomLogger";
import * as userData from "../../../../resourses/dataStorage/UserData";
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

    it("Authorization page. Not registered user", async () => {
        // *** STEPS ***
        await homePage.openHomePage(); 
        let homePageUrl = await homePage.getPageUrl();        
        
        await homePage.clickLoginButton();
        let authorizationPageUrl = await authorizationPage.getPageUrl();

        CustomLogger.logging("On the authorization page enter not registered email and any password");
        await authorizationPage.enterUserCredentials(userData.userEmailUnregistered,
                                                     userData.userPasswordRandomized,
                                                     true);

        let passwordFieldAttr = await authorizationPage.getPasswordFieldAttribute("type");      
        
        await authorizationPage.clickLogin()
        let errorMessageBoxText = await authorizationPage.getErrorMessageBoxText();
        
    
        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("Home page has to be opened");
        expect(homePageUrl).toBe("https://www.ssls.com/");

        CustomLogger.logging("Authorization page has to be opened");
        expect(authorizationPageUrl).toBe("https://www.ssls.com/authorize");

        CustomLogger.logging("After click on 'eye' icon in password field, password should be displayed");
        expect(passwordFieldAttr).toBe("text");

        CustomLogger.logging("If user not registered, errors messages such as: “Uh oh! Email or password is \
                              incorrect should be displayed”");
        expect(errorMessageBoxText).toBe(userData.errorTextNotregisteredEmail);   
    }); // it
}); // describe
