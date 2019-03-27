import BasePage from './BasePage';
import Element from '../components/Element';

export const emailField = 'div[class="form-group email"]>input[type="email"]';
export const passwordFieldPassword = 'div[class="input-box password"]>input[type="password"]';
export const passwordFieldText = 'div[class="input-box password"]>input[type="text"]';
export const authLoginButton = 'form[name="authForm"] button[type="submit"]';
export const passwordEyeButton = 'button[ng-click="showPassword = !showPassword"]';
export const profileDropdownButton = 'div[class="profile-box clear ng-scope"]>button[class*="dropdown-btn"]';
export const viewProfileLink = '//a[@class="drop-link"][text()="View profile"]';
export const logOutButton = '//button[@class="drop-button"][text()="Log out"]';

export const authPageHeader = '//h1[text()="Authorization"]';
export const openedAuthHeader = '//h1//span[text()="Buying SSL just got easier!"]';

//Messages
export const incorrectCredsMessage = 'Uh oh! Email or password is incorrect';
export const emptyEmailFieldMessage = '//span[contains(text(),"Oops, please")]';
export const emptyPasswordFieldMessage = '//div[@class="tooltip tooltip-error"]/span[contains(text(),"Looks like you")]';


export default class AuthorizePage extends BasePage {

    static gettingAuthPageHeader(){
        return Element.of(authPageHeader).getValueText();
    }
}
