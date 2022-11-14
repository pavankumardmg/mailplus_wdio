/* eslint-disable no-var */
import CoffeeBreak from './CoffeeBreak';
import HomePage from '@pages/HomePage';
import PuzzlesPage from '@pages/PuzzlesPage';
import QuickCrossWord from '@pages/puzzles/QuickCrossWord';


export async function loadPages() {
  global.homePage = new HomePage(uiClient.instance);
  global.puzzlesPage = new PuzzlesPage(uiClient.instance);
  global.coffeBreak = new CoffeeBreak();
  global.quickCrossWord = new QuickCrossWord(uiClient.instance);
  await coffeBreak.load();
}

declare global {
  var homePage: HomePage;
  var puzzlesPage: PuzzlesPage;
  var quickCrossWord: QuickCrossWord;
  var coffeBreak: CoffeeBreak;
}
