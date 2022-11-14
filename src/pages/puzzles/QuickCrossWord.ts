import Basepage from '@pages/Basepage';
import loadash from 'lodash';
export default class QuickCrossWord extends Basepage {
  private puzzleTitle = 'Quick Crossword';

  get modalDialogHeading() {
    return this.browser.$('div#puzzle-completed-dialog h1');
  }

  async getAcrossElements() {
    return await this.browser.$$(
      '//div[@id="questions-cont"]//h3[text()="Across"]/parent::div//div[contains(@class,"question")]'
    );
  }
  async getDownElements() {
    return await this.browser.$$('//div[@id="questions-cont"]//h3[text()="Down"]/parent::div//div[contains(@class,"question")]');
  }

  async closeToolTip() {
    await this.browser.$('.tippy-box[data-state="visible"] div#close-btn').click();
  }

  async getAcrossQuestions() {
    const a = await this.getAcrossElements();
    const question: string[] = [];
    Promise.all(
      a.map(async (ele) => {
        await ele.scrollIntoView();
        question.push(await ele.getText());
      })
    );
    return question;
  }

  getAcrossAnswer(value: string) {
    const data = coffeBreak.filterGamesByTitle(this.puzzleTitle).data;
    return loadash.find(data.hor, { question: value }).answer;
  }

  getDownsAnswer(value: string) {
    const data = coffeBreak.filterGamesByTitle(this.puzzleTitle).data;
    return loadash.find(data.ver, { question: value }).answer;
  }

  async fillAcrossSolution() {
    for (const b of await this.getAcrossElements()) {
      await b.click();
      const answer = this.getAcrossAnswer(this.formatQuestion(await b.getText()));
      await this.typeKeys(answer);
    }
  }

  async fillDownSolution() {
    for (const b of await this.getDownElements()) {
      await b.click();
      const answer = this.getDownsAnswer(this.formatQuestion(await b.getText()));
      const getSelectedCellValues = await this.browser.$$('td[class*=active] div[class*="value"]');
      const emptyIndexs = await this.getIndex(getSelectedCellValues);
      await this.typeKeys(emptyIndexs.map((a) => answer.at(a)).join(''));
    }
  }
  private async getIndex(elements: WebdriverIO.Element[]) {
    const indexes: number[] = [];
    await Promise.all(
      elements.map(async (a, index) => {
        const bb = (await a.getText()).trim();
        if (bb.length === 0) {
          indexes.push(index);
        }
      })
    );
    return indexes.sort();
  }

  private formatQuestion(value: string) {
    return value.replace(/[0-9(),]+/g, '').trim();
  }
}
