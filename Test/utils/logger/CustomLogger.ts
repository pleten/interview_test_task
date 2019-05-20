import * as log4js from "log4js";

export class CustomLogger{
    public static logging(logText: string): void{
  
        let customLogger = log4js.getLogger();
        customLogger.level = "debug";
        customLogger.debug(logText);        
    } // logging
}