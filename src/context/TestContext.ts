/* eslint-disable no-var */
import {IWorldOptions, World, setWorldConstructor} from '@cucumber/cucumber';
import UiClient from 'uiClient';

export default class TestContext extends World<BrowserStackType> {
    private _value: unknown;

    constructor(options: IWorldOptions) {
        super(options);
        global.uiClient = new UiClient();
    }

    get value(): unknown {
        return this._value;
    }

    set value(value: unknown) {
        this._value = value;
    }

    async screenshot() {
        await this.attach(
            await uiClient.instance.saveScreenshot('cucumber-report/screenshots/' + Math.random() + '.png'),
            'image/png'
        );
    }
}
setWorldConstructor(TestContext); // world means sharing context between steps across scenarios and features

export interface BrowserStackType {
    browserName: string;
    browserVersion: string;
    os: string;
    osVersion: string;
}

declare global {
    var uiClient: UiClient;
    var testContext: TestContext;
}