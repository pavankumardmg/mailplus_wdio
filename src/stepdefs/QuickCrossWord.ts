import { Given, Then, When } from '@cucumber/cucumber';
import('expect-webdriverio');

Given('the Puzzles page', () => {
  // Write code here that turns the phrase above into concrete actions
});

When('user select {string}', async (puzzleName: string) => {
  await puzzlesPage.mostPopularPuzzle.clickOnPlayNow(puzzleName);
});

When('close the tooltip', async () => {
  await quickCrossWord.closeToolTip();
});
Given('user should be signed in', () => {
  // Write code here that turns the phrase above into concrete actions
});

Then('user should see {string} text in Quick Crossword modal', async (s: string) => {
  await expect(quickCrossWord.modalDialogHeading).toHaveText(s);
});

When('fill the Down', async () => {
  await quickCrossWord.fillDownSolution();
});

When('fill the Across', async () => {
  await quickCrossWord.fillAcrossSolution();
});

When('click on the Options', () => {
  // Write code here that turns the phrase above into concrete actions
});

Then('user should see following options in modal dialogue', () => {
  // Write code here that turns the phrase above into concrete actions
});
