## Description:
- This tests based on
  https://docs.google.com/document/d/1Tt4pwhMfxsdUuiZ3adYU6NlaTTTr1sD2JjmtRI_fpIU/edit
- Tests were written just following AC assuming that we already have
  tests in other levels that covers the functionality
-  I used CodeceptJs framework and his Puppeteer helper in headless
   mode, to show browse change `show: false` to true in
   `codecept.conf.js`

- I used +- standard folder structure tha proposed by framework itself 

-  I was using JS, but there is a small demo how we can integrate TS
   with CodeceptJs, to run ts test, change `tests` property in
   `codecept.conf.js`
- Tests were stable in my machine, but in case they will fail run used
  docker just add `waitForTimeout: 3000` to Puppeteer configuration in
  `codecept.conf.js`
- There is no linters =( 
   
## Preconditions
```
Node v7.6.0 or greater.
````
## Installation
To install node dependencies
```
npm install
```

## Run tests
To run tests
```
    npx codeceptjs run 
```    

## Tests report
To generate and open the tests report use the following command after the test run(-s):
    
```
    $ node_modules/allure-commandline/bin/allure serve output/

```

## Docker
### Precondition
Docker engine 17.06.0+

### Build the image and run container 

docker-compose -f docker-compose.test.yml build
docker-compose -f docker-compose.test.yml up -d

### Run tests
```
docker exec -it codeceptjs npx codeceptjs run
```
