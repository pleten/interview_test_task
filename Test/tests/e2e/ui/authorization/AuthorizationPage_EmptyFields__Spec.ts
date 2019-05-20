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


    it("Authorization page. Empty fields", async () => {
        // *** STEPS ***
        
        await homePage.openHomePage(); 
        let homePageUrl = await homePage.getPageUrl();

        await homePage.clickLoginButton();
        
        let authorizationPageUrl = await authorizationPage.getPageUrl();
       
        await authorizationPage.clickLogin(); 

        let errorNotFilledEmailInputText = await authorizationPage.getErrorTextNotFilledEmailInput();
        let errorNotFilledPasswordInputText = await authorizationPage.getErrorTextNotFilledPasswordInput();

        // *** VERIFICATION ***
        CustomLogger.logging("Home page has to be opened");
        expect(homePageUrl).toBe("https://www.ssls.com/");

        CustomLogger.logging("Authorization page has to be opened");
        expect(authorizationPageUrl).toBe("https://www.ssls.com/authorize");

        CustomLogger.logging("If user not filled all fields, errors messages such as:");
        CustomLogger.logging("- For Email field: “Oops, please enter your email”");
        expect(errorNotFilledEmailInputText).toBe(userData.errorTextNotFilledEmailInput);

        CustomLogger.logging("- For Password field: “Looks like you’ve missed this one should be displayed”");
        expect(errorNotFilledPasswordInputText).toBe(userData.errorTextNotFilledPasswordInput);
    }); // it
});
