var homePage = function () {

    
    var personal = element(by.xpath('//div[@class="filter-item"]/a[contains(.,"Personal")]'));
    var personal_content_first = element(by.xpath('(//div[@class="ssl-content"]//price)[1]'));
    var personal_content_two = element(by.xpath('(//div[@class="ssl-content"]//price)[3]'));
    
    var businnes = element(by.xpath('//div[@class="filter-item"]/a[contains(.,"Business")]'));
    var multi_dom = element(by.xpath('//div[@class="filter-item ng-scope"]/a[contains(.,"multi-domain")]'));
    var multi_text = element(by.xpath('//h3[text()="PositiveSSL Multi-Domain"]'));

    var cheapest = element(by.xpath('//div[@class="sort-btn ng-scope"]/a[contains(.,"Cheapest")]'));
    var featured = element(by.xpath('//div[@class="sort-btn ng-scope"]/a[contains(.,"Featured")]'));

    var featured_rating = element(by.xpath('(//h3[@class="ssl-name ng-binding"]/following::div[contains(@class,"rating stars")])[1]'));
    var featured_rating_2 = element(by.xpath('(//h3[@class="ssl-name ng-binding"]/following::div[contains(@class,"rating stars")])[8]'));
    
    // profile
    

        this.goto = function (url) {
            browser.get(url);
            expect(browser.getCurrentUrl()).toBe(url);
    };
    
    this.refresh = function () {
        browser.driver.navigate().refresh()
    };
    
    this.button_personal = function (personal_but) {
        expect(personal.getText()).toBe(personal_but);
        personal.click();
    };

    this.button_multi = function (multi_but) {
        expect(multi_dom.getText()).toBe(multi_but);
        multi_dom.click();
        
    };

    this.button_cheapest = function (personal_but) {
        expect(cheapest.getText()).toBe(personal_but);
        cheapest.click();
    };

    this.button_featured = function (personal_but) {
        expect(featured.getText()).toBe(personal_but);
        featured.click();
    };

    this.check_featured = function () {

        featured_rating.getAttribute('class').then(function (atr) {
            rat1 = atr.split('-');
            var rating = parseInt(rat1[1]);
            console.log(rating);
            featured_rating_2.getAttribute('class').then(function (atr2) {
                rat2 = atr2.split('-');
                var rating2 = parseInt(rat2[1]);
                console.log(rating2);
                
                if (rating => rating2) {
                    //console.log("Sorting Ratings - works correctly");
                    expect(rating).toBeGreaterThan(rating2);
                    expect(rating).not.toEqual(rating2)
                } else{
                    //console.log("The Sorting Ratings is not working");
                    expect(rating).toBeLessThan(rating2);
                    
                }
                
            });
            
        })
    };
    

    this.check_sorting_multi = function () {
        return multi_text.getText();  
    };


    this.check_cheapest = function () {
        personal_content_first.getText().then(function(text1) {
            name = text1.split('/')[0];
            console.log(name);
            personal_content_two.getText().then(function (text2) {
                name2 = text2.split('/')[0];
                console.log(name2);

                if (name <= name2) {
                    console.log("Sorting Personal - works correctly");
                    expect(name).toBeLessThan(name2);
                    
                }
                else {
                    console.log("The Sorting personal is not working");
                    expect(name).toBeGreaterThan(name2);
                }
            });
        });
    };


    this.check_sorting_personal = function () {
        var els = element.all(by.cssContainingText('.ssl-name.ng-binding', 'PositiveSSL'));
        expect(els.count()).toBeGreaterThan(2);
        
           

    };
    

// Or using the shortcut $$() notation instead of element.all(by.css()):






};  
module.exports = new homePage();