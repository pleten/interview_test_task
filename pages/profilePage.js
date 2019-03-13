var ProfilePage = function async () {

    var name = element(by.cssContainingText('form .item', 'Name')).$('.description');
    var email = element(by.cssContainingText('form .item', 'Email')).$('.description');
    var password = element(by.cssContainingText('form .item', 'Password')).$('.description');
    var phone = element(by.cssContainingText('form .item', 'Phone')).$('.description');
    var address = element(by.cssContainingText('form .item', 'Address')).$('.description');
    var supportPin = element(by.cssContainingText('form .item', 'Support pin')).$('.description');
    var newsletter = element(by.cssContainingText('form .item', 'Newsletter')).$('.description');
    var updateSupportPin = element(by.cssContainingText('form .item', 'Support pin')).$('button[name="supportPin"]');

    this.getProfileDetails = async function() {0
        var profileDetails = {}
        
        profileDetails.name = await name.getText();
        profileDetails.email = await email.getText();
        profileDetails.password = await password.getText();
        profileDetails.phone = await phone.getText();
        profileDetails.address = await address.getText();
        profileDetails.supportPin = await supportPin.getText();
        profileDetails.newsletter = await newsletter.$('button.toggle-btn.on') ? true : false;

        return profileDetails;
    };

    this.updateSupportPin = async function(pass) {
        await updateSupportPin.click();
    };
};
module.exports = ProfilePage;