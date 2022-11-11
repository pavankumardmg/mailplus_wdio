/* eslint-disable no-var */
import CoffeeBreak from './CoffeeBreak';
import HomePage from '@pages/HomePage';
import PuzzlesPage from '@pages/PuzzlesPage';

declare global {
  var homePage: HomePage;
  var puzzlesPage: PuzzlesPage;
  var coffeBreak: CoffeeBreak;
}
export async function loadPages() {
  global.homePage = new HomePage();
  global.puzzlesPage = new PuzzlesPage();
  global.coffeBreak = new CoffeeBreak();
  await coffeBreak.load();
}
