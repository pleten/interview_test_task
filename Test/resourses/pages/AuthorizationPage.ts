import { element, by } from "protractor";
import { BasePage } from "./BasePage";
import * as Locators from "../locators/AuthorizationPageLocators";
import { Waiters } from "../../utils/waiters/Waiters";
import { CustomLogger } from "../../utils/logger/CustomLogger";

export class AuthorizationPage extends BasePage{
    private waiter = new Waiters();

    private loginButton = element(by.xpath(Locators.loginBtnXpath));
    private eyeButton = element(by.xpath(Locators.EyeButtonXpath));

    private emailInput = element(by.xpath(Locators.emailInputXpath));
    private passwordInput = element(by.xpath(Locators.passwordInputXpath));

    private passwordField = element(by.xpath(Locators.passwordDisplayedInputXpath));

    private errorMessageBox = element(by.xpath(Locators.errorMessageBoxXpath));

    private invalidEmailErrorLabel = element(by.xpath(Locators.invalidEmailErrorLabelXpath));
    private errorTextNotFilledEmailInput = element(by.xpath(Locators.errorTextNotFilledEmailInputXpath));
    private errorTextNotFilledPasswordInput = element(by.xpath(Locators.errorTextNotFilledPasswordInputXpath));

    public async enterEmail(email:string){
        CustomLogger.logging("Enter password" + email);
        await this.waiter.waitForVisibility(this.emailInput);        
        await this.emailInput.clear();
        await this.emailInput.sendKeys(email);
    }

    public async enterPassword(password:string){
        CustomLogger.logging("Enter password" + password);
        await this.waiter.waitForVisibility(this.passwordInput);
        await this.passwordInput.clear();
        await this.passwordInput.sendKeys(password);
    }  // enterPassword

    public async clickEyeButton(){
        CustomLogger.logging("Click EYE button");
        await this.waiter.waitForVisibility(this.eyeButton);
        await this.eyeButton.click();
    }  // clickEyeButton

    public async clickLogin(){
        CustomLogger.logging("Click 'Login' button");
        await this.waiter.waitForVisibility(this.loginButton);
        await this.loginButton.click();
    }  // clickLogin

    public getPasswordText() {  
        CustomLogger.logging("Get password text");      
        return this.passwordField.getText();       
    }  // getPasswordText

    public getPasswordFieldAttribute(attributeValue: string){
        CustomLogger.logging("Get password field attribute value");
        return this.passwordField.getAttribute(attributeValue);       
    }  // getPasswordFieldAttribute

    public async enterUserCredentials(email:string, password: string, isPasswordShown: boolean){
        CustomLogger.logging("Enter email and password: " + email + "; " + password);
        await this.enterEmail(email);
        await this.enterPassword(password);        
        if(isPasswordShown === true){
            await this.clickEyeButton();
        }        
    }  // enterUserCredentials

    public async getErrorMessageBoxText(){
        CustomLogger.logging("Get error text of message box");
        await this.waiter.waitForVisibility(this.errorMessageBox);
        return this.errorMessageBox.getText();
    }  // getErrorMessageBoxText

    public async getInvalidEmailErrorText(){
        CustomLogger.logging("Get error text when invalid email has been entered");
        return this.invalidEmailErrorLabel.getText();
    }  // getInvalidEmailErrorText

    public async getErrorTextNotFilledEmailInput(){
        CustomLogger.logging("Get error text when email field is empty");
        let rawErrorText = await this.errorTextNotFilledEmailInput.getText();
        return rawErrorText;
    }  // getErrorTextNotFilledEmailInput

    public getErrorTextNotFilledPasswordInput(){
        CustomLogger.logging("Get error text when password field is empty");
        let rawErrorText = this.errorTextNotFilledPasswordInput.getText();
        return rawErrorText;
    }  // getErrorTextNotFilledPasswordInput
}  // AuthorizationPage