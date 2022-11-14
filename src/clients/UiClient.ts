import { RemoteOptions, remote } from 'webdriverio';
import { customClick } from '@helpers/BrowserUtils';

export default class UiClient {
  private browser: WebdriverIO.Browser;
  private config: RemoteOptions;

  constructor(config: RemoteOptions) {
    this.config = config;
  }
  get instance() {
    return this.browser;
  }

  async init() {
    this.browser = await remote(this.config);
    await customClick(this.browser);
  }

  async close() {
    await this.browser.closeWindow();
  }
  async deleteSession() {
    await this.browser.deleteSession();
  }
  async updateStatus(status: string, reason: string) {
    await this.browser.execute(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"' + status + '","reason": "' + reason + '"}}'
    );
  }
}
