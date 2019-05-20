import { browser } from "protractor";


export class Postconditions{

    public async setUpAfter(){        
        await browser.manage().deleteAllCookies();
    }  // setUpAfter
    
}