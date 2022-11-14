export async function customClick(browser: WebdriverIO.Browser) {
  await browser.overwriteCommand(
    'click',
    async function (originalClick) {
      await this.scrollIntoView({ block: 'center' });
      await this.pause(200);
      if ((await this.isClickable()) && (await this.waitForDisplayed()) && (await this.isDisplayedInViewport())) {
        return originalClick();
      }
      return null;
    },
    true
  );
}
