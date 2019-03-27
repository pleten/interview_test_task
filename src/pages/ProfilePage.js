import BasePage from './BasePage';
import Element from '../components/Element';

export const profileNameField = '//span[text()="Name"]/parent::div/following-sibling::div/span';
export const profileEmailField = '//span[text()="Email"]/parent::div/following-sibling::div/span';
export const profilePhoneField = '//span[text()="Phone"]/parent::div/following-sibling::div/span';
export const profileAddressField = '//span[text()="Address"]/parent::div/following-sibling::div/span';
export const profileSupportPINField = '//span[text()="Support pin"]/parent::div/following-sibling::div/span';
export const profileNewsletterField = '//span[text()="Newsletter"]/parent::div/following-sibling::div/span';

export const regeneratePinButton = 'button[name="supportPin"]';

export default class AuthorizePage extends BasePage {

    static gettingProfileFieldText(element){
        return Element.of(element).getValueText();
    }
}
