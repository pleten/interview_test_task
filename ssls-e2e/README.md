# QA automation Test

Test task for automation QA to write scenarios for https://www.ssls.com web application

## Getting Started

Instructions bellow give make you able to do pre-set up for running tests

### Prerequisites

To start you should have installed Node, Npm and Java on your local machine 

Node you can find on official site: https://nodejs.org/en/download/

Also you can see how to install Npm here: https://docs.npmjs.com/cli/install

Java you can see here: https://java.com/en/download/

Next steep will be settuping a protractor stuff:

Use npm to install Protractor globally with:

```sh
npm install -g protractor
```

This will install two command line tools, protractor and webdriver-manager. Try running protractor --version to make sure it's working.

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

```sh
webdriver-manager update
```

Now start up a server with:

```sh 
webdriver-manager start
```

## Running the tests

For running test suite execute next command in the CLI:

```sh
protractor conf.js
```