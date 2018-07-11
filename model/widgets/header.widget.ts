import {$, by} from "protractor";
import {Dropdown} from "./dropdown.widget";

let dropdown = new Dropdown();

export class Header {

    container = ".header";
    profileBoxButton = ".profile-box .btn";
    profileBoxDropdown = ".profile-box .dropdown-btn";
    loginButton = "a[ui-sref='authorize.index']";

    async choose(name: string) {
        try {
            await $(this.container).element(by.cssContainingText(".btn", name)).click();
        } catch {
            await dropdown.selectByCss(this.profileBoxDropdown, name);
        }

        return this;
    }
}
