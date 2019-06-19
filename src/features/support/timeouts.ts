import { setDefaultTimeout } from "cucumber";

const hooksAndStepsTimeout: number = 2 * 60 * 1000;

setDefaultTimeout(hooksAndStepsTimeout);

console.info(`Cucumber asynchronous hooks and steps timeout is: ${hooksAndStepsTimeout}`);