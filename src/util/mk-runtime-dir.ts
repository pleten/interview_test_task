// @ts-ignore
import tafConfig = require("config");
import {existsSync, mkdirSync} from "fs";
import {join} from "path";
import {rm} from "shelljs";

const runResultsDir: string = tafConfig.get('runOutputsDirectory');
const runtimeDataDir: string = `${join(__dirname, '../../../', runResultsDir, '../runtime-data/')}`;

const directory = {
    name: `reports`,
    path: `${runtimeDataDir}`,
    message: {
        operation: {
            clear: {
                before: '',
                inProgress: `Clearing runtime data directory ${runtimeDataDir}`,
                result: {
                    success: `The runtime data directory has been cleared.`,
                    failed: `The runtime data directory cannot be cleared.`
                }
            },
            create: {
                before: '',
                inProgress: `Creating runtime data directory ${runtimeDataDir}`,
                result: {
                    success: `The runtime data directory has been created.`,
                    failed: `The runtime data directory cannot be created.`
                }
            },
        }
    }
};

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