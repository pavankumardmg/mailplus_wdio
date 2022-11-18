import {RemoteOptions, remote} from 'webdriverio';
import {customClick} from '@helpers/BrowserUtils';

export default class UiClient {
    private browser: WebdriverIO.Browser;

    get instance() {
        return this.browser;
    }

    async init(config: RemoteOptions) {
        this.browser = await remote(config);
        await customClick(this.browser);
    }

    async quit() {
        await this.browser.closeWindow();
        await this.browser.deleteSession();
    }

    async updateStatus(status: string, reason: string) {
        await this.browser.execute(
            'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"' + status + '","reason": "' + reason + '"}}'
        );
    }
}