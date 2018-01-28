## Repository description:

Fundamentals are:
- [TypeScript](https://www.typescriptlang.org/docs/tutorial.html) - as project language
- [ProtractorJS](http://www.protractortest.org) - as browser control framework
- [Jasmine2](https://jasmine.github.io/) - as test runner
- [NPM](https://docs.npmjs.com/getting-started/what-is-npm) - as package manager and runner
- [Allure](https://github.com/allure-framework/allure2) - as reporter

#### Running
First, do: 

`npm install`

Instalation has `postinstall` hook, that triggers `webdriver-manager update` so you should have fresh chromedriver and selenium server downloaded and prepared.

Then compile your TypeScript code to JavaScript:

`npm run tsc`

Then, start tests:

`npm test`

By default - dirrect connect to local chrome driver is used. 

#### Reporting

Create report run:

`allure generate --clean`

To check report run:

`allure open`

Page with report will be opened in browser

#### PageObjects and PageFragments (Components)
- PageObjects are done using [ES6 classes](http://es6-features.org/#ClassDefinition)
- PageFragments (Components) done using ES6 classes and [protractor-element-extend](https://github.com/Xotabu4/protractor-element-extend) package

#### [TSLint](https://palantir.github.io/tslint/)

Project includes static code analysis. The most profit comes when your IDE is configured to execute analysis in watch mode. This will work automaticaly by installing plugins:

[TSLint in WebStorm](https://www.jetbrains.com/help/webstorm/2016.1/tslint.html)

[TSLint in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

Also TSLint will fail your `pre-test` task, if there is any errors. You can always switch errors to warnings in `tslint.json`: 
```
"defaultSeverity": "error",
``` 
To

```
"defaultSeverity": "warning",
```
