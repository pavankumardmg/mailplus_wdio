import { Then, When } from '@cucumber/cucumber';
import('expect-webdriverio');
When('user loads puzzle page', async () => {
  await homePage.open();
});

Then('Most popular text should be visible', async () => {
  console.log(coffeBreak.filterGamesByTitle('Codeword'));
  await expect(homePage.mostPopularText).toBeDisplayed();
});
