## Repository description:
To Execute tests you should do the following steps:
1) Download and install Chrome browser v 65 and above
2) Update nodejs:
   2.1)Update nodejs using Ubuntu
   - `curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -`
   - `sudo apt-get install -y nodejs`
   2.2) Update nodejs Debian, as root
   - `curl -sL https://deb.nodesource.com/setup_5.x | bash -`
   - `apt-get install -y nodejs`
3) Move to interview_test_task directory
4) Fallow steps and perform installation commands:
   - `npm install`
   - `npm install protractor`
   - `npm install webdriver-manager`
   - `webdriver-manager update`
   - `npm install protractor-stop-describe-on-failure`
   - `npm install jasmine-spec-reporter`
   - `npm install protractor-console`
   - `npm install protractor-testability-plugin`
   - `npm install jasmine-node`
   - `npm install jasmine-expect`
   - `npm install protractor-jasmine2-screenshot-reporter`
5) Open new terminal window
6) Move to interview_test_task directory
7) Run `protractor e2e/protractor.conf.js --suite=test`