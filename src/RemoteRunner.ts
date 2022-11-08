import { ITestCaseHookParameter } from '@cucumber/cucumber';
import type { Options } from '@wdio/types';
import HomePage from './pages/HomePage';

export const config: Options.Testrunner = {
  hostname: 'hub.browserstack.com',
  user: 'pavanswtjobs_D3JE5n',
  key: '7zMQaqNSUDA3AusxZ82f',
  automationProtocol: 'webdriver',
  specs: ['./features/**/*.feature'],
  maxInstances: 3,
  capabilities: [
    {
      browserName: 'Safari',
      browserVersion: '15.6',
      'bstack:options': {
        sessionName: 'OS X Monterey Safari 15.6',
        os: 'OS X',
        osVersion: 'Monterey',
      },
    },
    {
      browserName: 'Safari',
      browserVersion: '14.1',
      'bstack:options': {
        sessionName: 'OS X Big Sur Safari 14.1',
        os: 'OS X',
        osVersion: 'Big Sur',
      },
    },
    {
      browserName: 'Safari',
      browserVersion: '13.1',
      'bstack:options': {
        sessionName: 'OS X Catalina Safari 13.1',
        os: 'OS X',
        osVersion: 'Catalina',
      },
    },
  ],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.mailplus.co.uk/',
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver', 'browserstack'],
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

  beforeScenario: function (world: ITestCaseHookParameter, context: object) {
    global.homePage = new HomePage();
  },
};
