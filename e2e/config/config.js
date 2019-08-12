/* eslint-disable angular/json-functions */
"use strict";
 
const baseUrl = 'https://www.sbzend.ssls.com'
const password = '123456';

// const baseUrl = process.env.BASE_URL;
// const password = process.env.PASSWORD;

let config;
config = {
    baseUrl: baseUrl,
    selenoidUrl: 'http://167.71.92.219',
    users: {
        regularUser: {
            email: 'ssls.automation+666@gmail.com',
            password: password,
            username: 'Vasya Pupkin'
        },
    }
};

module.exports = config;
