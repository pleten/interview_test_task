let Data = function() {

    this.mainUrl = `https://www.ssls.com`;
    this.validUser = {
        email: `ssls.automation+5@gmail.com`,
        password: `123456`
    };
    this.notExistUser = {
        email: `not.registered.user5@gmail.com`,
        password: `654321`
    };
    this.invalidEmailUser = {
        email: `test@@test.com`,
        password: `123456`
    };

    this.loginError = `Uh oh! Email or password is incorrect`;
    this.invalidEmailError = `Uh oh! This\nisn’t an email`;
    this.blankEmailError = `Oops, please\nenter your email`;
    this.blankPasswordError = `Looks like you’ve\nmissed this one`;

    this.additionalUserData = { //for example
        name: "Vasya Pupkin",
        email: "ssls.automation+5@gmail.com",
        phone: "+380 57123456789",
        address: "Diagon alley 2, Misto, Uryupinsk 612120, Ukraine",
        pin: "AzcS",
        newsletter: true
    }
};
module.exports = new Data();