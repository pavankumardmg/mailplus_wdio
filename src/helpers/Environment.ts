import {BrowserStackType} from 'testContext';
import {RemoteOptions} from 'webdriverio';
import lodash from 'lodash';

export function defaultCaps(): RemoteOptions {
    return {
        logLevel: 'silent',
        baseUrl: 'https://uat-dlv.sandbox-mailplus.gcpp.io',
        waitforTimeout: 30000,
        automationProtocol: 'webdriver',
        capabilities: {},
    };
}

export function localCaps(browserName: string): RemoteOptions {
    const localCaps = defaultCaps();
    localCaps.runner = 'local';
    localCaps.capabilities = {browserName: browserName ?? 'chrome'};
    return localCaps;
}

export function remoteCaps(options: BrowserStackType, sessionName: string): RemoteOptions {
    const remoteCapabilities = defaultCaps();
    remoteCapabilities.hostname = 'hub.browserstack.com';
    remoteCapabilities.user = 'pavanvpgts_LS1wBZ';
    remoteCapabilities.key = 's8CsiizRCJxovjzT6';
    remoteCapabilities.capabilities = {
        'bstack:options': {
            buildName: `TEST ON: ${options.os}_${options.osVersion}_${options.browserName}_${options.browserVersion}: ${testContext.value}`,
            browserName: options.browserName,
            browserVersion: options.browserVersion,
            os: options.os,
            osVersion: options.osVersion,
            sessionName: sessionName,
        },
    };
    return remoteCapabilities;
}

export function capabilities(options: BrowserStackType, scenarioName: string) {
    return isRemote() ? remoteCaps(options, scenarioName) : localCaps(options.browserName);
}

export function isRemote() {
    return !(lodash.isUndefined(process.env['remote']) || process.env['remote'].includes('false'));
}