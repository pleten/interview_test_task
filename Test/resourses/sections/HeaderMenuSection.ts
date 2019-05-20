import { HomePage } from "../pages/HomePage";
import { AuthorizationPage } from "../pages/AuthorizationPage";
import { Waiters } from "../../utils/waiters/Waiters";
import * as Locators from "../../resourses/locators/HeaderMenuSectionLocators";
import { element, by } from "protractor";

export class HeaderMenuSection{
    private waiter = new Waiters();
    private homePage = new HomePage();
    private authorizationPage = new AuthorizationPage();

    private dropDownMenuButton = element(by.xpath(Locators.dropDownMenuButtonXpath));
    private logoutButton = element(by.xpath(Locators.logoutButtonXpath));
    private loginButton = element(by.xpath(Locators.loginButtonXpath));

    private loginButtonText = element(by.xpath(Locators.loginButtonTextXpath));

    public async openDropDownMenu(){
        await this.waiter.waitForVisibility(this.dropDownMenuButton);
        await this.dropDownMenuButton.click();
        await this.waiter.waitForVisibility(this.logoutButton);
    }  // openDropDownMenu

    public async clickDropDownMenuItem(itemLocator: string){
        let elementForClick = element(by.xpath(itemLocator));
        await this.waiter.waitForVisibility(elementForClick);        
        return elementForClick.click();
    }  // clickDropDownMenuItem

    public getLoginButtonText(){
        return this.loginButtonText.getText;
    }  // getMenuButtonText

    public async loginUser(email: string, password: string){        
        await this.homePage.clickLoginButton();
        await this.authorizationPage.enterUserCredentials(email,
                                                          password,
                                                          false);
        await this.authorizationPage.clickLogin();
    }  // loggingUser

    public async isLoginButtonVisible(){
        await this.waiter.waitForVisibility(this.loginButton);
        return this.loginButton.isDisplayed();
    }  // isLoginButtonVisible
}