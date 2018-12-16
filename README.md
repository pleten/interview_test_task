## Zone3000 UI TESTS
***

> 14.12.2018

> Info !
> You'll need the Node > 8.14.x for correct runs
> Commands should be run from the root directory of project

#### USAGE

:: install npm modules

    npm i
    
:: to run tests locally download the required binaries for webdriver-manager
    
    node_modules\.bin\webdriver-manager update
    
:: run test suite by name
    
    node --max_old_space_size=4096 node_modules\protractor\built\cli.js conf.js --suite=full
    
:: test run results
    
    projectDir/results/screenshots/my-report.html    
    
:: for focusing special test in spec, use 'fit' or 'fdescribe' declaration. [http://jasmine.github.io/2.2/focused_specs.html]

:: for WebStorm there is a nice plugin for  better maintenance of tests inside of IDE [https://github.com/andresdominguez/ddescriber]

   ---    
    
### **Dockerization of node, node modules and source files**

    I used docker file to create image Dockerfile to run container where node version 8.14.0 is located 
    and node_modules installed after copying of package.json file from source repository 
    to container
    
      - docker build --rm -t zone3000 -f ./Dockerfile .


##### Launching test in Docker Containers using Selenoid

 >  Manual for Selenoid [https://aerokube.com/selenoid/latest/] 
 
 >  Manual for Selenoid Configuration Manager [https://aerokube.com/cm/latest/]
 
    You can start localy tests either using direct WebDriver or Selenoid (similar to SeleniumServer) 
    - you have to switch directConnect > true to allow use of remote WebDriver 

    To start tests localy in Selenoid you have to launch Selenoid using its Configuration Manager which has to be downloaded
    
##### For Windows

   1. Download last binaries [https://github.com/aerokube/cm/releases/tag/1.5.1]

   2. Start Selenoid

    ./cm.exe selenoid update --vnc

##### On Linux and Mac OS

   1. Download CM and Start Selenoid with VNC server

     curl -s https://aerokube.com/cm/bash | bash  && ./cm selenoid start --vnc

     Location of selenoid directory with videos and container logs

     /Users/user/.aerokube/selenoid on MacOS

     /root/.aerokube/selenoid on Linux

  2. Start Selenoid-UI (Interface for opening VNC instances of browsers)

    ./cm selenoid-ui start

    You can check Selenoid status and test execution via selenoid-ui 
    