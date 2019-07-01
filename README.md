## Repository description:

This repository is for uploading results of the completed test task.

- You should create new project from a scratch. Project could be developed with any programming language and any framework you want.
- Project should be in the new branch. 
- Create new Pull Request when task will be finished.
- Project should contain covered test cases that are described in task document and contain instructions how to build and run your project.

PLEASE NOTE: Due to known issue with webdriver-manager, please pay attention on the versions of the following packages:
 - protractor v.5.4.2;
 - webdriver-manager v.12.1.3;
 - chromedriver v.74.0.3729.6

 Otherwise, browser won't be started.

 How to get started:
 1. Install npm packages running command - npm install
 2. Download chromedriver by running script  - npm run webdriver-update
 3. Run all suits by the following script - npm run test-chrome