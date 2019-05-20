import { browser } from "protractor";
import { EventEmitter } from 'events';


export class Preconditions{

    public async setUpBefore(implicitlyWaitArg:number = 3000,
                          isMaximized: boolean = true){        
        EventEmitter.defaultMaxListeners = 0;
        await browser.manage().timeouts().implicitlyWait(implicitlyWaitArg);
        if(isMaximized){
            await browser.manage().window().maximize();
        }        
    }  // setUpBefore
    
}