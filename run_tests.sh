#! /bin/bash
date
echo "Installing dependencies and starting Webdriver"
npm install
webdriver-manager update
x-terminal-emulator -e webdriver-manager start
echo "Running test suite"
x-terminal-emulator -e node_modules/codeceptjs/bin/codecept.js run --steps --reporter mochawesome
echo "Check mochawesome.html in 'mochawesome-report' folder for test run report"
