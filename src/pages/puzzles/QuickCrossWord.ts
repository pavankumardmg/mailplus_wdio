import Basepage from '@pages/Basepage';
import loadash from 'lodash';
export default class QuickCrossWord extends Basepage {
  private puzzleTitle = 'Quick Crossword';
 getAcrossAnswer(value: string) {
    const data = coffeBreak.filterGamesByTitle(this.puzzleTitle).data;
    return loadash.find(data.hor, { question: value }).answer;
  }

 getDownsAnswer(value: string) {
    const data = coffeBreak.filterGamesByTitle(this.puzzleTitle).data;
    return loadash.find(data.ver, { question: value }).answer;
  }

 fillAcrossSolution(){
 }

}
