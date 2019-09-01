const {I} = inject();

module.exports = {
    url: "/authorize",
    logOutUrl: '/authorize/logout',
    authForm: '[name ="authForm"]',

    fields: {
        email: '[ng-model="form.email"]',
        password: '[ng-model="form.password"]',


    },
    showPassword: '[ng-click="showPassword = !showPassword"]',
    // could be slow, but readable =)
    loginBtn: locate('button[type="submit"]').withText('Login'),
    emailFieldTooltip: locate('.form-group.email').withDescendant('.tooltip-text'),
    // I would as developer to add some identifier  to get rid of
    passwordFieldTooltip: '//*[@class="input-box password"]/following::*[@class="left-tooltip-box"]', // shit

    login(email, password) {
        I.fillField(this.fields.email, email);
        I.fillField(this.fields.password, password);
        I.click(this.loginBtn);
    },

    texts: {
        emptyEmail: 'Oops, please\nenter your email',
        emptyPassword: 'Looks like you’ve\nmissed this one',
        invalidEmail: 'Uh oh! This\nisn’t an email',
    }
};
