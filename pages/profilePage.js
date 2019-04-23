import BasePage from './basePage';

class ProfilePage extends BasePage {
    constructor(){
        super();
        this.url = '/user/profile';
        this.title = 'My Profile | SSLs.com';
        this.valueName = element(by.cssContainingText('div.item', 'Name')).$('div.description');
        this.valueEmail = element(by.cssContainingText('div.item', 'Email')).$('div.description');
        this.valuePass = element(by.cssContainingText('div.item', 'Password')).$('div.description');
        this.valuePhone = element(by.cssContainingText('div.item', 'Phone')).$('div.description');
        this.valueAddress = element(by.cssContainingText('div.item', 'Address')).$('div.description');
        this.valueSupportPin = element(by.cssContainingText('div.item', 'Support pin')).$('div.description');
        this.valueNewsletter = element(by.cssContainingText('div.item', 'Newsletter')).$('div.description button');
        this.btnUpdSupportPin = element(by.model('user.supportPin'));
    }

    getProfileValues() {
        var profileValues = []
        profileValues.push(this.valueName.getText());
        profileValues.push(this.valueEmail.getText());
        profileValues.push(this.valuePass.getText());
        profileValues.push(this.valuePhone.getText());
        profileValues.push(this.valueAddress.getText());
        profileValues.push(this.valueSupportPin.getText());
        profileValues.push(this.valueNewsletter.getAttribute('class'));

        return profileValues;
    }

}
export default new ProfilePage();