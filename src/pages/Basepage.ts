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
}
