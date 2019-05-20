import { browser, element, by, logging, ExpectedConditions } from "protractor";
import { BasePage } from "./BasePage";
import { baseUrl } from "../dataStorage/SiteData";
import { Waiters } from "../../utils/waiters/Waiters";
import * as Locators from "../locators/HomePageLocators";
import { CustomLogger } from "../../utils/logger/CustomLogger";


export class HomePage extends BasePage{
    private waiter = new Waiters();

    private loginButton = element(by.xpath(Locators.loginButtonXpath));

    private authPageTitle = element(by.xpath(Locators.authPageTitleXpath));

    private filteredSslProductsListInt = this.getElements(Locators.filteredSslProductsListIntXpath);
    private filteredSslProductsListCent = this.getElements(Locators.filteredSslProductsListCentXpath);

    public async clickLoginButton(){
        CustomLogger.logging("Click on 'LOG IN' text");       
        await this.loginButton.click();
        await this.waiter.waitForVisibility(this.authPageTitle);
    }  // clickLoginButton

    async openHomePage(): Promise<any>{
        CustomLogger.logging("Open Home page");
        await browser.get(baseUrl);
        await browser.waitForAngular();
    }  // openHomePage

    public async clickFilters(...filtersLocators: any[]){
        CustomLogger.logging("Select/deselect filters");
        for (let filterIndex = 0; filterIndex < filtersLocators.length; filterIndex++) {
            const filterLocator = filtersLocators[filterIndex];
            await this.getElement(filterLocator).click();        
        }
    }  // clickFilters

    public async getProductsPrices(){
        CustomLogger.logging("Get SSL products prices");
        let pricesArray: string[] = [];

        if(await this.filteredSslProductsListInt.count() != await this.filteredSslProductsListCent.count()){
            throw new Error('There is inconsistensy between INT and CENT parts of prices. Please check UI and locators of prices.');
        }
        else{
            for (let elementIndex = 0; elementIndex < await this.filteredSslProductsListInt.count(); elementIndex++) {
                let pricePartInt = await this.filteredSslProductsListInt.get(elementIndex).getText();
                let pricePartCent = await this.filteredSslProductsListCent.get(elementIndex).getText();            
                let totalPrice = pricePartInt + pricePartCent;
                pricesArray.push(totalPrice);
            }
        }
        return pricesArray;
    }  // getProductsPrices
}