let profilePage = function () {

    this.refreshSupportPinButton = element(by.xpath("//span[@class = 'icon icon-arrows-cw']"));
    let nameField = {value: "", name: "Name"};
    let emailField = {value: "", name: "Email"};
    let passwordField = {value: "", name: "Password"};
    let phoneField = {value: "", name: "Phone"};
    let addressField = {value: "", name: "Address"};
    let supportPinField = {value: "", name: "Support Pin"};
    let newsletterField = {value: "", name: "Newsletter"};
    this.fields = [nameField, emailField, passwordField, phoneField, addressField, supportPinField, newsletterField];


    this.getFieldValue = (fieldName) => {
        fieldName = fieldName.toLowerCase();
        if (fieldName === "support pin") {
            fieldName = "pin"
        }
        let field = element(by.xpath("//div[contains(@ng-class,'" + fieldName + "')]//div[@class = 'description']"));
        return field.getText()
    };

    this.getSupportPinField = () => {
        return supportPinField;
    };

};

module.exports = new profilePage();