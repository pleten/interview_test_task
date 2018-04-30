## Prepare env
### Java 8 OpenJDK installation

- `sudo add-apt-repository ppa:openjdk-r/ppa` 
- `sudo apt-get update` 
- `sudo apt-get -f install` 
- `sudo apt-get install openjdk-8-jdk`

### NodeJS installation

- `sudo add-apt-repository ppa:chris-lea/node.js` 
- `sudo apt-get update` 
- `sudo apt-get install nodejs`

### NPM installation

- `sudo apt-get install npm` 
- `sudo npm install npm -g`

### Protractor installation

- `sudo npm install -g protractor`
- `protractor --version`
- `sudo webdriver-manager update`

### Jasmine-Spec-Reporter installation

- `npm init`
- `npm install jasmine-spec-reporter --save`

## Run tests

- `protractor protractor.conf.js`
- run specific suite on specific env: `protractor protractor.conf.js --suite=login_test`
