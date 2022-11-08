import Basepage from './Basepage';
export default class HomePage extends Basepage {
  mostPopularText = $('//h1[text()="Most popular"]');

  async open() {
    await super.open('app/puzzle-bundles/20221023/mail-plus-preview/index.html#/daily-puzzles/2022-10-23');
  }
}
