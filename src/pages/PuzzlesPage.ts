import Basepage from './Basepage';

export default class PuzzlesPage extends Basepage {
  get mostPopularPuzzle() {
    return new MostPopularPuzzle(this.browser);
  }
}

class MostPopularPuzzle {
  private browser: WebdriverIO.Browser;
  constructor(browser: WebdriverIO.Browser) {
    this.browser = browser;
  }
  get mostPopular() {
    return this.browser.$$('//h1[text()="Most popular"]/parent::div//div[@class="title"]');
  }
  async getAllPuzzleText() {
    return await this.mostPopular.map((a) => a.getText());
  }

  async clickOnPlayNow(puzzleName: string) {
    await this.browser.$(
      
      `//h1[text()="Most popular"]/parent::div//div[normalize-space(text())="${puzzleName}" and @class="title"]/ancestor::app-puzzle-block//div[contains(@class,"play-btn")]`
    ).click();
  }
}
