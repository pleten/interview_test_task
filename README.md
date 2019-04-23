## Repository description
Maksym Zapisov interview test task.
I don't have experience in test automation with JavaScript, so this is my first tests on JS. But, I have experience in test automation using Java. When I was working on this task, I learned basic features of Protractor and Jasmine.

## Setup:
* Install [Node](http://nodejs.org) (v8.x.x or later)
* Install [Java](https://java.com) if you want to run tests on the standalone Selenium Server
* [Download](https://github.com/followzms/interview_test_task/archive/master.zip) or clone `git clone git@github.com:followzms/interview_test_task.git` repository
* Connect to the repository directory via Terminal/Command line and run `npm i` to install the project dependencies

## Run tests:
You can run tests with connecting directly to the browser OR on the standalone Selenium Server. For this, uncomment ONE of the following options in the `conf.js` file: seleniumServerJar OR directConnect.
* run tests via plain Protractor `node_modules/.bin/protractor conf.js` or `npm test`
* after test run will be completed, you can go to the `/reports/<date>/<browserName>` folder and take a look on generated test report by open `report.html` file