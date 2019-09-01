exports.config = {
    tests: './specs-e2e/*-test.js',
    // tests: './e2e-ts-exmp/*-test.ts', // uncomment this to run ts tests
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'https://www.sbzend.ssls.com',
            show: false,
            chrome: {
                args: ["--no-sandbox"] // for docker
            }
        }
    },
    include: {
        I: './steps/custom_steps.js',
        authorizePage: './pages/authorize.js',
        homePage: './pages/home.js',
        userProfilePage: './pages/user-profile.js',
        headerElem: './pages/elements/header.js',
        notificationCenterElem: './pages/elements/notification-center.js',
        User: './fixtures/user.json',
    },
    plugins: {
        autoLogin: {
            enabled: true,
            inject: "loginAs",
            saveToFile: true,
            users: {
                user: {
                    login: (I) => {
                        let User = require('./fixtures/user');
                        let authorizePage = require('./pages/authorize');
                        I.amOnPage(authorizePage.url);
                        I.waitForElement(authorizePage.authForm, 5);
                        authorizePage.login(User.email, User.password);
                        I.amOnPage('/');
                    },
                    check: (I) => {
                        let User = require('./fixtures/user');
                        let header = require('./pages/elements/header');
                        I.amOnPage('/');
                        I.see(User.email, header.userCertificatesBtn)
                    },
                },
            }
        },

        allure: {
            "enabled": true
        }
    },
    bootstrap: null,
    mocha: {},
    name: 'interview_test_task',
    require: ["ts-node/register"]
};
