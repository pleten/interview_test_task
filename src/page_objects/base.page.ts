import { browser } from 'protractor'

export abstract class BasePage {
    protected url: string = '' // Will be same as baseUrl by default.

    public async start() {
        await browser.get(this.url)
    }

    public async refreshPage() {
        return browser.refresh()
    }

    public async isPageLoaded() {
        return browser.wait(browser.executeScript(() => {
                return document.readyState === 'complete'
        }), 5000, 'Page has not been loaded')
        
    }
}
