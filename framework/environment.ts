import { existsSync, readFileSync } from 'fs';

const configFileName = './framework.conf.json';

let config: { baseUrl: string };

if (existsSync(configFileName)) {
    config = JSON.parse(readFileSync(configFileName, 'utf8').toString());
} else {
    throw new Error('!!! CONFIGURATION FILE IS REQUIRED, SEE  framework.conf.md FOR THE DETAILS !!!');
}

export class Environment {
    public static baseUrl: string = beautifyUrl(config.baseUrl);
}

function beautifyUrl(url: string): string {
    return url.replace(/\/+$/g, '');
}
