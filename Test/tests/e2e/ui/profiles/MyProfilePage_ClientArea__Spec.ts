import * as userData  from "../../../../resourses/dataStorage/UserData";
import { CustomLogger } from "../../../../utils/logger/CustomLogger";
import { HomePage } from "../../../../resourses/pages/HomePage";
import { ViewProfilePage } from "../../../../resourses/pages/ViewProfilePage";
import { HeaderMenuSectionSteps } from "../../../../resourses/sectionSteps/HeaderMenuSectionSteps";
import { HeaderMenuSection } from "../../../../resourses/sections/HeaderMenuSection";
import { Preconditions } from "../../preconditions/Preconditions";
import { browser, ExpectedConditions } from "protractor";
import { Postconditions } from "../../postconditions/Postconditions";


describe("Feature: Profiles.", () => {
    // Pages 
    let homePage = new HomePage();
    let viewProfilePage = new ViewProfilePage();
    let headerMenuSectionSteps = new HeaderMenuSectionSteps();
    let headerMenuSection = new HeaderMenuSection();

    beforeEach(async () => {
        await new Preconditions().setUpBefore();
    }); // beforeEach

    afterEach(async () => {
		await new Postconditions().setUpAfter();
	});  // afterEach

    it("My profile page. Client area.", async () => {
        // *** STEPS ***
        CustomLogger.logging("Precondition:");
        CustomLogger.logging("Log in to the user’s account");
        await homePage.openHomePage(); 
        await headerMenuSection.loginUser(userData.userEmail, userData.userPassword);                                       

        CustomLogger.logging("Open “View profile” page");
        await headerMenuSection.openDropDownMenu();
        await headerMenuSection.clickDropDownMenuItem("//a[.='View profile']");
        
        


        CustomLogger.logging("Save values(Do not change saved values) of such fields in Profile - Name, Email, Phone, Address, Support Pin, Newsletter");
        await viewProfilePage.editUserInfo(userData.userName,
                                           userData.userSurname,
                                           userData.userEmail,
                                           userData.userPhoneCode,
                                           userData.userPhone,
                                           userData.userStreet,
                                           userData.userCity,
                                           userData.userZip,
                                           userData.userCountry);

        let oldPinValue = await viewProfilePage.getElementText("(//div[@class='description']/span)[6]");
        CustomLogger.logging("Log out");
        await headerMenuSectionSteps.logout();
        


        CustomLogger.logging("Steps:");
        CustomLogger.logging("Log in to Account");
        await headerMenuSection.loginUser(userData.userEmail, userData.userPassword);

        CustomLogger.logging("Click on triangle near the \"User@email\" button");
        CustomLogger.logging("In drop-down menu select \"View profile\"");
        await headerMenuSection.openDropDownMenu();
        await headerMenuSection.clickDropDownMenuItem("//a[.='View profile']");
        
        browser.wait(ExpectedConditions.visibilityOf(viewProfilePage.getElement("//h1[@class='page-title']")));
        let profilePageTitle = await viewProfilePage.getElementText("//h1[@class='page-title']");
    
        // *** VERIFICATION ***
        CustomLogger.logging("Expected Result:");
        CustomLogger.logging("After click on \"View profile\" opened page \"Profile\" should be displayed");
        expect(profilePageTitle).toBe("Profile");

        CustomLogger.logging("Check that opened page has to contain values in the next fields and compare with values from precondition:\
        \nName;\nEmail;\nPassword (not empty);\nPhone;\nAddress;\nSupport pin;\nNewsletter");
        expect(await viewProfilePage.getElementText("(//div[@class='description']/span)[1]")).toBe("Vasya Pupkin"); 
        expect(await viewProfilePage.getElementText("(//div[@class='description']/span)[2]")).toBe("ssls.automation+5@gmail.com");  
        expect(await viewProfilePage.getElementText("(//div[@class='description']/span)[3]")).toBe("*****");
        expect(await viewProfilePage.getElementText("(//div[@class='description']/span)[4]")).toBe("+380 57123456789");
        expect(await viewProfilePage.getElementText("(//div[@class='description']/span)[5]")).toBe("Diagon alley 2, Misto, Uryupinsk 612120, Ukraine");
        expect(await viewProfilePage.getElementText("(//div[@class='description']/span)[6]")).toBe(oldPinValue);
        expect(await viewProfilePage.getElementText("(//div[@class='description']/span)[7]")).toBe("Include in mailing list");
    }); // it
});
