"use strict";

const headerPage = requirePO("layout/header"),
    homePage = requirePO("home/home");

describe("Home page. Sorting", function () {
    beforeAll(function () {
        browser.get("/");
        headerPage.certsLink.click();
    });

    afterAll(function () {
        helpers.logOut();
    });


    //ToDo: make the price comparation
});
