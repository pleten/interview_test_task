# Protractor test automation framework
## Installation flow

* Install [NodeJS (the latest version).](https://nodejs.org/en/) Download appropriate package according to your operating system.
* Download project locally from remote branch.
* After installation of NodeJS, please, install typescript and protractor globally:
```
npm install typescript -g
npm install protractor -g
```
Then you need to install all required packages. Open terminal and move to root folder of the downloaded project, then run following commands one by one.
* Install required node modules:
```
npm install
```
* Start server. Open separate terminal and run:
```
webdriver-manager update
```
```
webdriver-manager start
```
* Come back to the previous terminal (where you are in root folder of the project) and transpile TypeScript source code to JavaScript:
```
tsc
```
*  After that start runnign test:
```
cd out
```
```
protractor protractor.conf.js
```
Now execution process has been started.

After test execution you can see report of current test run. Please go to Reports folder. In root folder you need to run:
```
cd out/Reports
```

Open file 'report.html' in browser.

**Note:** if some test was failed, please, rerun test suite again because sometimes flaky tests happen.

