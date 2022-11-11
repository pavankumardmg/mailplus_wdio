import Basepage from './Basepage';

export default class PuzzlesPage extends Basepage {
  get mostPopularPuzzle() {
    return new MostPopularPuzzle();
  }

  get wordPopularPuzzle() {
    return new WordPopularPuzzle();
  }
}

class MostPopularPuzzle {
  private mostPopular = $$('//h1[text()="Most popular"]/parent::div//div[@class="title"]');

  async getAllPuzzleText() {
    return await this.mostPopular.map((a) => a.getText());
  }
}
class WordPopularPuzzle {}
