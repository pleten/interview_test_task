import {browser, ExpectedConditions} from "protractor";

export interface Page {
    open(path?: string): Promise<void>;

    isOpened(): Promise<boolean>;
}

export abstract class PageObject implements Page {
    public static async getCurrentUrl(): Promise<string> {
        return browser.getCurrentUrl();
    }

    public static async getTitle(): Promise<string> {
        return browser.getTitle();
    }

    public static async isUrlChanged(timeout: number = 10000): Promise<boolean> {
        try {
            await browser.wait(ExpectedConditions.urlContains(`builder/update`),
                timeout, 'The url is not changed');

            return true;
        } catch (e) {
            return false;
        }
    }

    private static async getState(): Promise<string> {
        const state: string = (await browser.executeScript(`return document.visibilityState;`)) as string;

        return state;
    }

    protected readonly url: string;

    protected constructor(url: string) {
        this.url = url;
    }

    public async isOpened(): Promise<boolean> {
        try {
            const visible: boolean = (await PageObject.getState()) === 'visible';
            const currentUrl: string = await PageObject.getCurrentUrl();

            return this.url === currentUrl && visible;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async open(url?: string): Promise<void> {
        return browser.get(url || this.url);
    }
}
