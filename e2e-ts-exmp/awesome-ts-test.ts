/// <reference path="./typings/steps.d.ts" />
Feature('Demo TS test');

Scenario('We can run test using TS', (I) => {
    I.amOnPage('/');
    I.see('Discount 51% off EV SSL.')
});
