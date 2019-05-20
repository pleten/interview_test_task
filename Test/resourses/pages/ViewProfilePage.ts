import { element, by } from "protractor";
import { BasePage } from "./BasePage";
import { Waiters } from "../../utils/waiters/Waiters";
import { CustomLogger } from "../../utils/logger/CustomLogger";

export class ViewProfilePage extends BasePage{
    private waiter = new Waiters();

    public async editUserInfo(userName: string = undefined,
                        userSurname: string = undefined,
                        userEmail: string = undefined,
                        userPassword: string = undefined,
                        userPhoneCode: string = undefined,
                        userPhone: string = undefined,
                        userStreet: string = undefined,
                        userCity: string = undefined,
                        userZip: string = undefined,
                        userCountry: string = undefined,
                        supportPin: boolean = undefined,
                        newsletter: boolean = undefined){
        CustomLogger.logging("Update user info details");
        if(userName != undefined || userSurname != undefined){            
            await this.clickEditButton(1);
            await this.clickSaveButton(1);            
        }

        if(userPhoneCode != undefined || userPhone != undefined || userZip != undefined){
            await this.clickEditButton(4);
            await this.clickSaveButton(4);         
        }

        if(userStreet != undefined || userCity != undefined || userZip != undefined){
            await this.clickEditButton(5);
            await this.clickSaveButton(5);         
        }

        if(supportPin != undefined){
            await this.clickEditButton(6);
        }

    }  // editUserInfo

    private async clickEditButton(buttonIndex: number){
        let editButtonXpath = "(//div[@class='description']/../button)[" + buttonIndex + "]";
        let editButton = element(by.xpath(editButtonXpath));
        await this.waiter.waitForVisibility(editButton);
        return element(by.xpath(editButtonXpath)).click();
    }  // clickEditButton

    private async clickSaveButton(buttonIndex: number){
        let saveButtonXpath = "(//button[@type='submit'])["+ buttonIndex +"]";
        let saveButton = element(by.xpath(saveButtonXpath));
        return saveButton.click();
    }  // clickSave Button 
}