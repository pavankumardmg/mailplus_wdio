import { After, AfterStep, Before, ITestCaseHookParameter, ITestStepHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import TestContext from 'testContext';
import { loadPages } from '@helpers/LoadPages';

setDefaultTimeout(100000);
Before({ name: 'Initialize Test context' }, function (this: TestContext) {
  global.testContext = this as TestContext;
});

Before({ tags: '@ui', name: 'Initialize UI Client' }, async function () {
  await uiClient.init();
  await loadPages();
});

After({ tags: '@ui', name: 'Close Ui Client' }, async function (scenario: ITestCaseHookParameter) {
  if (scenario.result.status === 'FAILED') {
    await uiClient.updateStatus('failed', 'Check local report');
  } else {
    await uiClient.updateStatus('passed', 'Passed');
  }
  await uiClient.close();
  await uiClient.deleteSession();
});

AfterStep({ tags: '@ui' }, async function (step: ITestStepHookParameter) {
  if (step.result.status === 'FAILED') {
    this.attach(await uiClient.instance.saveScreenshot('cucumber-report/screenshots/' + step.testStepId + '.png'), 'image/png');
  }
});
