//Chance is a minimalist generator of random [1] strings, numbers, etc. to help reduce some monotony particularly
// while writing automated tests or anywhere else you need anything random.
const chance = require('chance').Chance();
//const chance = new Chance();

export const siteUrl = 'https://www.ssls.com/';
export const siteAuthorizeUrl = 'https://www.ssls.com/authorize';

export const timeout = 15000;
export const pollingTime = 500;

export const randomPassword6Figures = chance.integer({ min: 111111, max: 187654 });
export const randomEmail = 'test'+Math.floor((Math.random() * 900000000) + 1)+'@example.com';

