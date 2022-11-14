import { BrowserStackType } from '../context/TestContext';
import { RemoteOptions } from 'webdriverio';
import lodash from 'lodash';

export function defaultCaps(browserName: string): RemoteOptions {
  return {
    logLevel: 'silent',
    baseUrl: 'https://uat-dlv.sandbox-mailplus.gcpp.io',
    waitforTimeout: 30000,
    automationProtocol: 'webdriver',
    capabilities: {
      browserName: browserName ?? 'chrome',
    },
  };
}
export function bsCaps(options: BrowserStackType): RemoteOptions {
  const dCaps = defaultCaps(options.browserName);
  dCaps.hostname = 'hub.browserstack.com';
  dCaps.user = 'qatesting_qQK0he';
  dCaps.key = '41WsaBhxMvNcskxPWR';
  dCaps.capabilities = {
    'bstack:options': {
      buildName: `Mail+ Puzzles Test Automation ${options.os}_${options.osVersion}_${options.browserName}_${options.browserVersion}`,
      browserName: options.browserName,
      browserVersion: options.browserVersion,
      os: options.os,
      osVersion: options.osVersion,
      sessionName: `Session_${options.os}_${options.osVersion}_${options.browserName}_${options.browserVersion}`,
    },
  };
  return isRemote() ? dCaps : defaultCaps(options.browserName);
}

export function isRemote() {
  return lodash.isUndefined(process.env['remote']) || process.env['remote'].includes('false') ? false : true;
}
