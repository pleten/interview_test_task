import { browser, element, by, logging } from "protractor";
import { baseUrl } from "../dataStorage/SiteData";
import { HeaderMenuSection } from "../sections/HeaderMenuSection";


export class HeaderMenuSectionSteps{
    private headerMenuSection = new HeaderMenuSection();

    public async logout(){
        await this.headerMenuSection.openDropDownMenu();
        return this.headerMenuSection.clickDropDownMenuItem("//button[.='Log out']");
    }  //  logout

    public openPageFromMenu(pageLocator: string){
        // TBD
    }  // openPageFromMenu
}