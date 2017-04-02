# Project Overview
The framework is built using the PageObject pattern with the prototypal inheritance.
All pages inherit from the `BasePage`. The BasePage is ment to
NOT to be instantiated. Methods and fields common for all pages defined in the 
BasePage object. 

# Project Setup

* Install npm by following the [instructions](https://docs.npmjs.com/getting-started/installing-node) 
* Install required modules with `npm install` from project root
* Run `npm run wd-update`

# Running tests
* Start webdriver-server with `npm run wd-start`
* Run tests with `npm test`
* Big amount of test data shall be kept in the `spec/data/test.data.js` file.
The `Array.prototype.takeRandom` method implemented to take random values from data arrays.
* Reports available in the `reports` folder

# Configuration

* Tests are run in Google Chrome by default. To run in a different browser 
change the `browserName` key value to required in `protractor.conf.js` file. To 
run against multiple browsers - add another object of `{ browserName: 'BROWSER_NAME'}`
to the `multiCapabilities` config option.

* Jasmine output is suppressed by default. To enable it comment out the
`print: function() {}` line in the `protractor.conf.js` file.


# Known issues

* Tests are failed to run against the `safari` browser. 
Additional investigation required.
