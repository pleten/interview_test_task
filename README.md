## Environment preparation

1. Install Mozilla FireFox 46.0.1 version OR latest 
(Pay attention that 
	- Selenium WebDriver doesn't work with Mozilla Firefox 47.0 version;
	- On Mozilla FF 50.0.1 and later the following error message appears when closing the Selenium Session (using webdriver.quit();), : 
	"The exception Breakpoint A brakpoint has been reached. 
	(0x80000003) occurred in the application at location 0x65e900ef. Click OK to terminate the program"
	https://github.com/mozilla/geckodriver/issues/375).
2. Download and install MS Visual Studio 2013/2015
3. Clone project from server to locale machine
4. Download NUnit Test Adapter 3.4.1 (https://nunit.org/index.php?p=download) 
5. Install NUnit Test Adapter 3.4.1 on your locale machine
6. Open project in MS Visual Studio
7. Build solution and check that all packages, which are mentioned in package.config, are present in the project. 
(They should be automatically set up after build solution.) 


## How to run tests

1. Open project in MS Visual Studio
2. Open Test menu item > Windows > Test Explorer item (Test Explorer panel with tests should be displayed.)
3. Click "Run All" link on the "Test Explorer" panel to run all existing tests
4. To run any of them separately:
	- mouse over the necessary test and open context menu;
	- select "Run selected tests" on context menu.