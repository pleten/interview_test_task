var supportPinBeforeTest;

Feature('User can update support pin value');

Before(async (I, loginAs, userProfilePage) => {
    loginAs('user');
    I.amOnPage(userProfilePage.url);
    I.waitForElement(userProfilePage.supportPinValue);
    supportPinBeforeTest = await I.grabTextFrom(userProfilePage.supportPinValue);

});

Scenario('Support pin value is not changed when user gets the page', (I, userProfilePage) => {
    I.amOnPage(userProfilePage.url);
    I.waitForElement(userProfilePage.supportPinValue);
    I.seeTextEquals(supportPinBeforeTest, userProfilePage.supportPinValue);
});

Scenario('User get new value of support pin after clicking on button', (I, userProfilePage) => {
    I.seeElement(userProfilePage.supportPinBtn);
    I.click(userProfilePage.supportPinBtn);
    I.waitForResponse(response => response.url().endsWith(userProfilePage.pinGeneratorApiUrl));
    I.dontSee(supportPinBeforeTest, userProfilePage.supportPinValue);
});

Scenario('No additional pin generation on page refresh', async (I, userProfilePage) => {
    I.click(userProfilePage.supportPinBtn);
    I.waitForResponse(response => response.url().endsWith(userProfilePage.pinGeneratorApiUrl));
    let valueAfterRefresh = await I.grabTextFrom(userProfilePage.supportPinValue);
    I.refreshPage();
    I.waitForElement(userProfilePage.supportPinValue, 3);
    I.seeTextEquals(valueAfterRefresh, userProfilePage.supportPinValue)
});
