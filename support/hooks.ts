const { Before, After, Status, setDefaultTimeout } = require("cucumber");
import { browser } from "protractor";

Before({ timeout: 10 * 2000 }, async () => {
    await setDefaultTimeout(100 * 2000);
    await browser.get(browser.baseUrl);
});

Before({ tags: "@toSkip" }, function () {
    return "skipped";
});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
        const screenShot = await browser.takeScreenshot();
        this.attach(screenShot, "image/png");
    }

    clearSessionStorage();
    clearLocalStorage();
    clearCookies();
});

export async function clearSessionStorage(): Promise<void> {
    await browser.executeScript('window.sessionStorage.clear();');
}

export async function clearLocalStorage(): Promise<void> {
    await browser.executeScript('window.localStorage.clear();');
}

export async function clearCookies(): Promise<void> {
    await browser.manage().deleteAllCookies();
}