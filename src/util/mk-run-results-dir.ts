// @ts-ignore
import tafConfig = require("config");
import {existsSync, mkdirSync} from "fs";
import {join} from "path";
import {rm} from "shelljs";

const runResultsDir: string = tafConfig.get('runOutputsDirectory');

console.info(`runResultsDir: ${runResultsDir}`);
if (!existsSync(runResultsDir)) {
    mkdirSync(runResultsDir);
}

const reportsDir: string = `${join(__dirname, '../../../', runResultsDir, 'reports/')}`;
const logsDir: string = `${join(__dirname, '../../../', runResultsDir, 'logs/')}`;

const directories = [
    {
        name: `reports`,
        path: `${reportsDir}`,
        message: {
            operation: {
                clear: {
                    before: '',
                    inProgress: `Clearing test reports directory ${reportsDir}`,
                    result: {
                        success: `The reports directory has been cleared.`,
                        failed: `The reports directory cannot be cleared.`
                    }
                },
                create: {
                    before: '',
                    inProgress: `Creating test reports directory ${reportsDir}`,
                    result: {
                        success: `The reports directory has been created.`,
                        failed: `The reports directory cannot be created.`
                    }
                },
            }
        }
    },
    {
        name: `logs`,
        path: `${logsDir}`,
        message: {
            operation: {
                clear: {
                    before: '',
                    inProgress: `Clearing test logs directory ${logsDir}`,
                    result: {
                        success: `The logs directory has been cleared.`,
                        failed: `The logs directory cannot be cleared.`
                    }
                },
                create: {
                    before: '',
                    inProgress: `Creating test logs directory ${logsDir}`,
                    result: {
                        success: `The logs directory has been created.`,
                        failed: `The logs directory cannot be created.`
                    }
                },
            }
        }
    }
];

for (const directory of directories) {
    try {
        if (existsSync(directory.path)) {
            console.info(directory.message.operation.clear.inProgress);
            rm('-rf', directory.path);
            console.info(directory.message.operation.clear.result.success);
            console.info(directory.message.operation.create.inProgress);
            mkdirSync(directory.path);
            console.info(directory.message.operation.create.result.success);
        } else {
            console.info(directory.message.operation.create.inProgress);
            mkdirSync(directory.path);
            console.info(directory.message.operation.create.result.success);
        }
    } catch (e) {
        // TODO:
        console.info(directory.message.operation.create.result.failed);
    }
}
