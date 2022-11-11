import { ITestCaseHookParameter } from '@cucumber/cucumber';
import type { Options } from '@wdio/types';
import { loadPages } from '@helpers/LoadPages';

export const config: Options.Testrunner = {
  automationProtocol: 'webdriver',
  specs: ['./features/**/*.feature'],
  maxInstances: 3,
  capabilities: [
    {
      browserName: 'chrome',
    },
    // {
    //   browserName: 'MicrosoftEdge',
    // },
    // {
    //   browserName: 'firefox',
    // },
  ],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'error',
  bail: 0,
  baseUrl: 'https://www.mailplus.co.uk/',
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver', 'geckodriver'],
  framework: 'cucumber',
  reporters: ['spec'],
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: ['./src/stepdefs/steps.ts'],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: 'not @ignore',
    // <number> timeout for step definitions
    timeout: 60000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
    // retry the failures
    retry: 1,
  },

  beforeScenario: async function (world: ITestCaseHookParameter, context: object) {
    await loadPages();
  },
};
