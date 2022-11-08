import { Then, When } from '@wdio/cucumber-framework';
When('user loads puzzle page', async () => {
  await homePage.open();
});

Then('Most popular text should be visible', async () => {
  await expect(homePage.mostPopularText).toBeDisplayed();
});
