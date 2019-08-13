## Repository description:

This repository is for uploading results of the completed test task.

- You should create new project from a scratch. Project could be developed with any programming language and any framework you want.
- Project should be in the new branch. 
- Create new Pull Request when task will be finished.
- Project should contain covered test cases that are described in task document and contain instructions how to build and run your project.



## E2e testing documentation page
----
### Preconditions
To set the user password (PASSWORD) and base url (BASE_URL) with the environment variables (or make changes in your local progect in the 'e2e/config/config.js' file);
And to install 'Make' for using shorter and custom commands that universal for Windows (bette to use with the bash terminal) and Unix systems

### Installation
To install node dependencies (browser drivers are installed after the installation automatically via the postinstall script):

    $ make installTestsDependencies
    or
    $ npm install

### Run tests
To run tests in one parallel on your local machine use the following command:
    
    $ make testE2eLocal
    or
    $ node_modules/protractor-flake/bin/protractor-flake --parser standard  --max-attempts=1 -- e2e/config/local.conf.js

To run tests in two (or more) parallels on the remote (Selenoid) machine use the following command:
   
    $ make testE2eRemoteParallels
    or
    $ node_modules/protractor-flake/bin/protractor-flake --parser standard  --max-attempts=2 -- e2e/config/remote.conf.js

### Tests report
To generate and open the tests report use the following command after the rest run(-s):
    
    $ make generateAllureReport
    or
    $ node_modules/allure-commandline/bin/allure serve

### ESlint
To check your code quality user the following command:

    $ make esLint
    or
    $ node_modules/.bin/eslint e2e/
