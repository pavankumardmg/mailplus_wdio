import * as waitFor from 'wdio-wait-for';

export async function customClick(browser: WebdriverIO.Browser) {
    await browser.overwriteCommand(
        'click',
        async function (originalClick) {
            await this.scrollIntoView({ block: 'center' });
            const isClickable = await browser.waitUntil(waitFor.elementToBeClickable(this), { timeoutMsg: 'Error on custom click' });
            if (isClickable) {
                return originalClick();
            }
            return null;
        },
        true
    );
}