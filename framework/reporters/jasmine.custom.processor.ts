import { Color } from 'colors';
import { DisplayProcessor } from 'jasmine-spec-reporter';
import { CustomReporterResult } from 'jasmine-spec-reporter/built/spec-reporter';
import { ConsoleLog } from './console.log';

import SuiteInfo = jasmine.SuiteInfo;

export class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return ConsoleLog.addDateToString(log);
    }

    public displaySuite(suite: CustomReporterResult, log: string): string {
        return ConsoleLog.addDateToString(`Start "${suite.description}" suite`.yellow);
    }

    public displaySuccessfulSpec(spec: CustomReporterResult, log: string): string {
        return ConsoleLog.addDateToString(log);
    }

    public displayFailedSpec(spec: CustomReporterResult, log: string): string {
        return ConsoleLog.addDateToString(log);
    }

    public displaySpecErrorMessages(spec: CustomReporterResult, log: string): string {
        return ConsoleLog.addDateToString(log);
    }
}
