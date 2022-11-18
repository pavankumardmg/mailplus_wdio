import * as waitFor from 'wdio-wait-for';

export default class Basepage {
    protected browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser;
    }

    async open(path: string) {
        await this.browser.maximizeWindow();
        await this.browser.url(path);
    }

    async accept() {
        while (await this.browser.isAlertOpen()) await this.browser.acceptAlert();
    }

    async typeKeys(value: string) {
        for (const key of Array.from(value)) await this.browser.keys(key);
    }

    async getAllText(selector: string) {
        await this.browser.waitUntil(waitFor.numberOfElementsToBeMoreThan(this.browser.$$(selector), 1));
        return await this.browser.$$(selector).mapSeries(async (element) => (await element.getText()).trim());
    }
}