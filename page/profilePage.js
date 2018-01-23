var profilePage = function () {

    
    var view_profile = element(by.xpath('//a[text()="View profile"]'));
    var title_profile = element(by.xpath('//h1[contains(.,"Profile")]'));
    var pin = element(by.model('user.supportPin'));
    var pin_up = element(by.css('[name="form"] > div:nth-of-type(6) > div.description > span.text'));
    
    
    // profile
    
    this.profile = function () {
        view_profile.click();
    };
    this.title_profile = function () {
        return title_profile.isPresent()  
    };
    this.view_profile_fields = function (name) {
        
        var name_profile = element(by.cssContainingText('.terms', name));
        return name_profile.getText();
    };

    this.notBeNull = function () {
        var test = element(by.css('[name="form"] > div:nth-of-type(6) > div.description > span.text'));
        
    };
    
    
    this.fields = function (field) {
        var value = element(by.cssContainingText('.description>span', field));
        return value.getText();
    };
    
    
    
    this.support_pin = function () {
        pin.isPresent();
        pin.click();
        
        
        
    this.update_pin = function () {
        pin_up.getText().then(function(text){
            console.log(text);
            //expect(text).not.toBe(null);

        });  
    };    
        //var test = element(by.css('[name="form"] > div:nth-of-type(6) > div.description > span.text'));
        

    };

    

// Or using the shortcut $$() notation instead of element.all(by.css()):


    



};  
module.exports = new profilePage();