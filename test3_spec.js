var width = 1920;
var height = 800;


describe('sbzend.ssls.com homepage UI-tests', function() {
  
  it('1.Authorization page (Welcome back!)', function() {
  	
  	
  	browser.driver.manage().window().setSize(width, height);
	browser.get('https://www.sbzend.ssls.com');//Open Home page
	browser.sleep(2000);
    var myHomePage = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/div/div[1]/div[2]'));
    expect(myHomePage.isDisplayed()).toBe(true);
	
  });
  it('Authorization page has to be opened', function() {
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/a')).click();//Click on "LOG IN" text
	browser.sleep(2000);
	var myLoginPage = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/p'));
    expect(myLoginPage.isDisplayed()).toBe(true);
	
  });
  it('Password should be displayed', function() {
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[1]/div/input')).sendKeys('ssls.automation+666@gmail.com');
	browser.sleep(200);
	element(by.css("input[name='password']")).sendKeys('123456');
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[2]/button')).click();// click on "eye" icon
    browser.sleep(200);
	var myPass = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[1]/input'));
	expect(myPass.isDisplayed()).toBe(true);
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[3]/button')).click();
    browser.sleep(200);
  });
  it('Log in button has to be changed', function() {
	var myEmail = element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/div/a')).getText();
    expect(myEmail.getText()).toEqual('ssls.automation+666@gmail.com');
	browser.sleep(200);
	//User is logged in
  });


  it('8. Home page. Filters', function() {
	//User has to be logged in
	element(by.xpath('//*[@id="certs"]/div[2]/div[1]/div[1]/a')).click();// Click on "Personal" filter button 
	browser.sleep(200);
	let str = element.all(by.css(".desc-box.ng-binding"));
    element.all(by.css('.desc-box.ng-binding')).each(function(element, index) {
    
     element.getText().then(function (i) {
     	  
              var b= "Domain validation";
              if (i.includes(b)) {
                console.log('OK ---   Personal filter contain`s only product cards with Domain Validation')
                
              }
              else{
              	
                throw new Error('Error!!! Personal filter NOT contain`s only product cards with Domain Validation');
              	
              }
     });
    });
    element(by.xpath('//*[@id="certs"]/div[2]/div[1]/div[1]/a')).click();// Unclick on "Personal" filter button
    


    // 8.2 
    element(by.xpath('//*[@id="certs"]/div[2]/div[1]/div[2]/a')).click();// Click on "BUSINESS" filter button 
    element(by.xpath('//*[@id="certs"]/div[2]/div[2]/div[1]/a')).click();// Click on "ONE DOMAIN" filter button 
	browser.sleep(200);
	element.all(by.css('.desc-box.ng-binding')).each(function(element, index) {
    
     element.getText().then(function (i1) {
     	  
              var b1= "1 domain";
              var b2= "Organization validation";
              if (i1.includes(b1&&b2)) {
                console.log('OK ---   Personal filter contain`s only product cards with 1 domain and Organization validation');
                
              }
              
              else{	
                throw new Error('Error!!! Personal filter NOT contain`s only product cards with 1 domain and Organization validation');
              }
     });
    });
    element(by.xpath('//*[@id="certs"]/div[2]/div[1]/div[2]/a')).click();// Unclick on "BUSINESS" filter button 
    element(by.xpath('//*[@id="certs"]/div[2]/div[2]/div[1]/a')).click();// UnClick on "ONE DOMAIN" filter button  
    


    // 8.3 
    element(by.xpath('//*[@id="certs"]/div[3]/div/a')).click();// Click on "CHEAPEST" filter button 
    var fooButton = element(by.xpath('//*[@id="certs"]/div[3]/div/a'));
    expect(fooButton.isDisplayed()).toBe(true);

	browser.sleep(200);//Have not done work yet!!!
	console.log('8.3 case have not done work yet!!!');




       
  });

  it('7. My profile page. Refresh support pin', function() {
	//User has to be logged in
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/div/button')).click();// click triangle dropdown
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/div/ul/li[5]/a')).click();// click "View profile" button
	browser.sleep(200);
	var pTitle = element(by.css(".page-title"));
    expect(pTitle.getText()).toBe('Profile');// Check the title to contain 'Profile'.
    let list2 = element.all(by.css('.description span'));
    var pin0 = list2.get(42).getText();// get first pin text
    element(by.name('supportPin')).click();//click refresh pin button
    browser.sleep(2000);
    let list0 = element.all(by.css('.description span'));
    var pin1 = list0.get(42).getText();// get second pin text
    expect(pin1).not.toEqual(pin0);// check pin text not equal
        
  });


  it('6.My profile page. Client area', function() {
  	//User has to be logged in
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/div/button')).click();// click triangle dropdown
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/div/ul/li[5]/a')).click();// click "View profile" button
	browser.sleep(200);
	var pTitle = element(by.css(".page-title"));
    expect(pTitle.getText()).toBe('Profile');// Check the title to contain 'Profile'.
    let list0 = element.all(by.css('.description span'));
    var pin = list0.get(42).getText();// get pin text
    

    let list1 = element.all(by.css('.description span'));
    expect(list1.count()).toBe(46);
    expect(list1.get(0).getText()).toBe('Vasya Pupkin');// check Name
    expect(list1.get(7).getText()).toBe('ssls.automation+666@gmail.com');// check email
    expect(list1.get(18).getText()).toBe('*****');// check pass
    expect(list1.get(18).isDisplayed()).toBe(true);// check pass is displayed
    expect(list1.get(30).getText()).toBe('+380 57123456789');// check Phone
    expect(list1.get(38).getText()).toBe('Diagon alley 2, Misto, Uryupinsk 612120, Ukraine');// check Address
    expect(list1.get(42).getText()).toBe(pin);// check pin
    expect(list1.get(45).getText()).toBe('Include in mailing list');// check Newsletter

  });
    




  it('5.Log Out', function() {
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/div/button')).click();// click triangle dropdown
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/div/ul/li[7]/button')).click();// click "Log out" button
    expect(browser.getCurrentUrl()).toBe('https://www.sbzend.ssls.com/authorize');//Check user has loged out and  redirected on authorization page
    browser.sleep(200);

    //User is logged out!
  });
  


  it('Home page 4 has to be opened', function() {
   	//User is logged out!
   	browser.restart();
   	browser.driver.manage().window().setSize(width, height);
	browser.get('https://www.sbzend.ssls.com');//Home page 4
	browser.sleep(2000);
    var myHomePage3 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/div/div[1]/div[2]'));
    expect(myHomePage3.isDisplayed()).toBe(true);
	
  });
  it('4. Authorization page. Empty fields', function() {
	browser.sleep(200);
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/a')).click();// click on LOG IN button
	var myLoginPage2 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/p'));
    expect(myLoginPage2.isDisplayed()).toBe(true);
    element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[3]/button')).click();// click on Login button
    browser.sleep(200);
    let list = element.all(by.css('.tooltip.tooltip-error span'));
    expect(list.count()).toBe(3);
    expect(list.get(1).getText()).toBe('Oops, please\nenter your email');// check error msg for email
    expect(list.get(2).getText()).toBe('Looks like you’ve\nmissed this one');// check error msg for pass
    browser.sleep(200);
    

  }); 



  it('Home page 3 has to be opened', function() {
   	browser.restart();
   	browser.driver.manage().window().setSize(width, height);
	browser.get('https://www.sbzend.ssls.com');//Home page 3
	browser.sleep(2000);
    var myHomePage3 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/div/div[1]/div[2]'));
    expect(myHomePage3.isDisplayed()).toBe(true);
	
  });
  it('3. Authorization page. Invalid email', function() {
	browser.sleep(200);
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/a')).click();// click on LOG IN button
	var myLoginPage2 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/p'));
    expect(myLoginPage2.isDisplayed()).toBe(true);
    element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[1]/div/input')).sendKeys('auto@@mation@gmail.com');
	browser.sleep(200);
    var span3 = element(by.css('.tooltip-text'));
    expect(span3.getText()).toBe('Uh oh! This\nisn’t an email');
    browser.sleep(200);
	element(by.css("input[name='password']")).sendKeys('123456');
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[2]/button/span[1]')).click();//click on "eye" icon
	var myPass3 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[1]/input'));
	expect(myPass3.isDisplayed()).toBe(true);
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[3]/button')).click();// click on Login button
    browser.sleep(2000);
    

  }); 






  it('Home page 2 has to be opened', function() {
   	browser.restart();
   	browser.driver.manage().window().setSize(width, height);
	browser.get('https://www.sbzend.ssls.com');//Home page 2
	browser.sleep(2000);
    var myHomePage2 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/div/div[1]/div[2]'));
    expect(myHomePage2.isDisplayed()).toBe(true);
	
  });
  it('Authorization failed', function() {
	browser.sleep(200);
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/ssls-header/header/div[2]/div[4]/div[1]/a')).click();
	var myLoginPage2 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/p'));
    expect(myLoginPage2.isDisplayed()).toBe(true);
    element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[1]/div/input')).sendKeys('automation@gmail.com');
	browser.sleep(200);
	element(by.css("input[name='password']")).sendKeys('1234567890');
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[2]/button/span[1]')).click();//click on "eye" icon
	var myPass2 = element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[1]/input'));
	expect(myPass2.isDisplayed()).toBe(true);
	element(by.xpath('//*[@id="ng-app"]/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[3]/button')).click();// click on Login button
    browser.sleep(2000);
    var span2 = element(by.css('.noty_text'));
    expect(span2.getText()).toBe('Uh oh! Email or password is incorrect');

  });
});
