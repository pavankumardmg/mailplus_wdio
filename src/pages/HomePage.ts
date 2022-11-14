import Basepage from './Basepage';
export default class HomePage extends Basepage {
  get mostPopularText() {
    return this.browser.$('//h1[text()="Most popular"]');
  }

  async open() {
    await super.open('/app/puzzle-bundles/20211002/mail-plus-preview/index.html#/daily-puzzles/2021-10-02');
  }
}
