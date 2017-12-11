# Protractor/CodeceptJS Example Project
Test https://ssls.com site functionality using Webdriver I/O and CodeceptJS in style "from user's perspective" for demonstrative purposes 

## Prerequisites
* **node.js >= 4.2.6**;
* **NPM >= 4.2.0**

## Installation
1. Install dependencies: 
```
npm install
```

```
[sudo] npm install -g protractor@^5.0.0
```
2. Install `selenium-standalone server`:
```
[sudo] npm install selenium-standalone@latest -g
```
```
[sudo] selenium-standalone install
```

## Run 

### Integration tests
Run npm scripts:

1. start `selenium-standalone server`:
```
npm run server
```
2. in new bash instance start `codeceptjs` test run:
```
npm run e2e
```
## Structure
* /pages - described page according to page-object pattern
* /tests - test scenarios, written in "from user's perspective" style
* /resources - not JS artifacts used in project
* steps_file.js - custom steps for **"I"** interface to extend test suite  
