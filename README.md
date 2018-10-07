Getting Started
---------------

To get set up and running quickly:

```
apt-get install nodejs
```

```
install npm
```

```
npm install -g protractor
```
```
webdriver-manager update
```
```
webdriver-manager update
```
Then you can start up server the following command:
```
webdriver-manager start
```

Then open the new terminal and run:
- for all tests:
```
protractor configuration.js
```
- for Login page tests:
```
protractor configuration.js --suite login
```
- for Header page tests:
```
protractor configuration.js --suite header
```
- for Profile page tests:
```
protractor configuration.js --suite profile
```
- for Home page tests:
```
protractor configuration.js --suite home
```