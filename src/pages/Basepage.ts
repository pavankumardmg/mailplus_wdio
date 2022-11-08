import HomePage from './HomePage';

export default class Basepage {
  async open(path: string) {
    await browser.url(path);
  }
}

declare global {
  var homePage: HomePage;
}
