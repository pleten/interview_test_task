module.exports = {
    url: 'https://www.ssls.com/authorize',
    email: 'ssls.automation+5@gmail.com',
    wrongData: {
        incorrectEmail: 'someincorrectemail@email.com',
        incorrectPassword: 'password',
        notEmail: 'test@@test.com'
    },
    password: '123456',
    title: 'Authorization',
    passwordType:{
        password: 'password',
        text: 'text'
    },
    fields: {
        email: 'email',
        password: 'password'
    },
    errors:{
        incorrectEmailOrPassword: 'Uh oh! Email or password is incorrect',
        notEmail: 'Uh oh! This\nisn’t an email',
        emailRequired: 'Oops, please\nenter your email',
        passwordRequired: 'Looks like you’ve\nmissed this one'
    }
};