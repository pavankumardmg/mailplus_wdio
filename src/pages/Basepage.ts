export default class Basepage {
  async open(path: string) {
    await browser.url(path);
  }
}
