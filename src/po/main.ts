import {Locators} from "./cfg/locators";
import { browser, $, $$, ElementFinder, protractor } from "protractor";


export class MainPO {
    private locators: Locators = new Locators();    
    private loginBtn: ElementFinder = $(this.locators.MainPage.LOGIN_BTN);
    
    get(){
        browser.get('/');
    };
    
    startLogIn(){
        this.loginBtn.click();
    };
};
