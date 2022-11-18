import {
    After,
    AfterStep,
    Before,
    ITestCaseHookParameter,
    ITestStepHookParameter,
    setDefaultTimeout
} from '@cucumber/cucumber';
import TestContext, {BrowserStackType} from 'testContext';
import {capabilities, isRemote} from '@helpers/Environment';
import {loadPages} from '@helpers/LoadPages';

setDefaultTimeout(100000);
const currentDate = new Date().toUTCString();

Before({name: 'Initialize Test context'}, function (this: TestContext) {
    global.testContext = this as TestContext;
    testContext.value = currentDate;
});

Before({tags: '@ui', name: 'Initialize UI Client'}, async function (scenarioName: ITestCaseHookParameter) {
    await uiClient.init(
        capabilities(
            this.parameters as BrowserStackType,
            'Feature: '.concat(scenarioName.gherkinDocument.feature.name, ' - Scenario: ', scenarioName.pickle.name)
        )
    );
    await loadPages();
});

After({tags: '@ui', name: 'Update test result in Browserstack'}, async function (scenario: ITestCaseHookParameter) {
    if (isRemote()) {
        await uiClient.updateStatus(scenario.result.status.toLowerCase(), 'Check test report');
    }
    await uiClient.quit();
});

AfterStep({tags: '@ui'}, async function (step: ITestStepHookParameter) {
    if (step.result.status === 'FAILED') {
        this.attach(await uiClient.instance.saveScreenshot('cucumber-report/screenshots/' + step.testStepId + '.png'), 'image/png');
    }
});