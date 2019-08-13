SHELL := /bin/bash

installTestsDependencies:
	npm install

testE2eRemoteParallels:
	node_modules/protractor-flake/bin/protractor-flake --parser standard  --max-attempts=1 -- e2e/config/remote.conf.js

testE2eLocal:
	node_modules/protractor-flake/bin/protractor-flake --parser standard  --max-attempts=1 -- e2e/config/local.conf.js

generateAllureReport:
	node_modules/allure-commandline/bin/allure serve

esLint:
	node_modules/.bin/eslint e2e/
