import { browser } from 'protractor';
import { Environment } from '../environment';

const shift = '       ';
export class ConsoleLog {
    static async systemInfo() {
        console.log('\nTest Framework Configuration:'.yellow);
        console.log(`${shift}SSLS url - ` + `${Environment.baseUrl}`.green);
        console.log();
        return {
            baseUrl: Environment.baseUrl,
        };
    }

    static trace(text: string) {
        console.log(ConsoleLog.addDateToString(text));
    }

    static error(text: string) {
        this.trace(`ERROR: ${text}`.red);
    }

    static warning(text: string) {
        this.trace(`Warning: ${text}`.yellow);
    }

    static withResult(text: string, isPassed: boolean) {
        if (isPassed) {
            this.trace(`${text} PASS`.green);
        } else {
            this.trace(`${text} FAIL`.red);
        }
    }

    static addDateToString(text: string) {
        return `${getCurrentDateTimeString()} ${text}`;
    }

    static async browserConsoleErrors() {
        const browserLogs = await browser
            .manage()
            .logs()
            .get('browser');
        browserLogs.forEach(log => {
            if (log.level.value > 900) {
                ConsoleLog.warning(`BROWSER CONSOLE: ${log.toJSON().message}`);
            }
        });
    }
}

function getCurrentDateTimeString() {
    const now = new Date();
    return `[${now.toLocaleDateString()} ${now.toLocaleTimeString()}]`;
}
