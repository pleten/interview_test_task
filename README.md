#### Preparing Environment
Your machine should have installed NodeJS, Chrome 58 or higher and installed webdriver-manager
(You can install webdriver manager using ``npm install -g webdriver-manager`` command

#### Running tests via Bash script
Navigate to root directory and execute ``sh run_tests.sh`` command to run tests via Bash script

If you will get any errors try alternative path:
#### Installing dependencies and starting webdriver-manager
1. Navigate to root directory and execute ``npm install`` command to resolve dependencies
2. Get latest selenium server using ``node_modules/webdriver-manager/bin/webdriver-manager update``
3. Star selenium server using ``node_modules/webdriver-manager/bin/webdriver-manager start``

#### Run tests
1. Open one more terminal instance and navigate to the root of the current testsuite
2. Run ``node_modules/codeceptjs/bin/codecept.js run --steps --reporter mochawesome`` command

#### Test results
Tests execution progress will be displayed in console. Once all tests are done html report will be saved in ``mochawesome-report`` folder.
