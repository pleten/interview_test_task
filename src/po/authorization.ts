import {Locators} from "./cfg/locators";
import {browser, $, $$, ElementFinder, protractor, ElementArrayFinder} from "protractor";

export class AuthorizationPO {
    private locators: Locators = new Locators();
    private loginBtn: ElementFinder = $(this.locators.AuthorizePage.LOGIN_BTN);
    private showPasswordBtn: ElementFinder = $(this.locators.AuthorizePage.SHOW_PASSWORD_BTN);
    private emailInpt: ElementFinder = $$(this.locators.AuthorizePage.EMAIL_FORM_INPT).first();
    private passwordInpt: ElementFinder = $(this.locators.AuthorizePage.PASSWORD_FORM_INPT);
    private userEmailBtn: ElementFinder = $(this.locators.AuthorizePage.USER_EMAIL_BTN);
    public generalErrorMessage: ElementFinder = $(this.locators.AuthorizePage.EMAIL_ERROR_SPN);
    public fieldErrorMessage: ElementFinder = $(this.locators.AuthorizePage.FIELD_ERROR_SPN);
    public fieldErrorMessages: ElementArrayFinder = $$(this.locators.AuthorizePage.FIELD_ERROR_SPN);
    private accountActionsBtn: ElementFinder = $(this.locators.AuthorizePage.ACCOUNT_ACTIONS_BTN);
    private logOutBtn: ElementFinder = $(this.locators.AuthorizePage.LOG_OUT_BTN);

    public get() {
        browser.get('/authorize');
    };

    public fillCredentials(email: string, password: string) {
        this.emailInpt.sendKeys(email);
        this.passwordInpt.sendKeys(password);
    };

    public getEmail() {
        return this.emailInpt.getText();
    };

    public getPassword() {
        return this.passwordInpt.getText();
    };

    public showPassword() {
        if (this.isPasswordHidden()) this.showPasswordBtn.click();
    };

    public hidePassword() {
        if (!this.isPasswordHidden()) this.showPasswordBtn.click();
    };

    public isPasswordHidden(){
       return this.passwordInpt.getAttribute('type').then(attrValue =>{return 'password' == attrValue});
    };

    public isEmailErrorShown(){
        return this.generalErrorMessage.isPresent().then(result => {return result});
    };

    public isInvalidEmailErrorShown(msg: string){
        if(!this.fieldErrorMessage.isPresent().then(result => {return result})) return false;
        return this.fieldErrorMessage.getText().then(txt => {msg === txt});
    };

    public logIn() {
        this.loginBtn.click();
    };

    public logOut() {
        this.accountActionsBtn.click();
        this.logOutBtn.click();
    };

    public isUserAuthenticated() {
        return this.userEmailBtn.isPresent();
    };

    public isFieldErrorVisible(msg: string){

        let activeItems = this.fieldErrorMessages.filter((elem, index) => {return elem.getText()
           .then((text) => {return (msg === text)})});
        if(activeItems.first().isPresent()) return true;

        return false
    }
};
