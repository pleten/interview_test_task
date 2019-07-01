## SSLs.com Frontend Automated Tests


This will check if frontend super features of SSLs.com work fine, automatically.


### Preconditions
You'll need some stuff to be installed on your computer to start:  

1. [Java](https://java.com/download/) - because Selenium Webdriver is written in it.  
2. [Node.js](https://nodejs.org) - because everything else is written in it (try a version starting from the 10th).  
3. npm - will be installed all along with Node.js.  
4. Web browser - it should be clear why ([Chrome](https://www.google.com/chrome) is the only one supported for now).


### How to run
Simply open the project folder (where this file is placed) with the CLI and run the following command:  
`npm run start`

For running it in parallel, with multiple browser instances, run:  
`npm run start:parallel`


### Where's the results?
There are three types of reports being generated: 
 
1. CLI report - you'll see the results in your command line while the tests are running.  
2. HTML report - when a test run is finished, a beautiful and dynamic HTLM document with all the details about the run is generated, including statistics and screenshots.  
3. XML report - just raw data in a file, that you might want to convert to something useful.

The reports generated are stored in /tmp folder.
   
  
---
All for now. 
To be presented in the next releases:

* multiple browser support; 
* tests run in a cloud (more browsers!);  
* auto-mailing for test results;  
* the tests will be extended.


Enjoy!
