var Profile = function() {
    var self = this;

    this.form = element(by.css('.panel form'));
    this.rows = this.form.$$('.item');
    this.newsToggle = element(by.model('user.newsletterOn'));
    this.supportPinRefreshBtn = element(by.model('user.supportPin'));

    //TODO: document method
    this.getData = function() {
        var profile = {};
        var name,value;

        return self.rows.each(function(row, index) {
            browser.controlFlow().execute(function() {
                row.$('.terms').getText().then(function(text) {
                    name = text;
                });
            }).then(function() {
                row.$('.description').getText().then(function(text) {
                    value = text;
                });
            }).then(function() {
                expect(name.length > 0).toBeTruthy();
                expect(value.length > 0).toBeTruthy();
                profile[name] = value;
                name.includes("Newsletter") && (self.newsToggle.getAttribute('checked').then(function(value) {
                    profile[name] = value;
                }));
            })
        }).then(function() {
            return profile;
        })
    }

    //TODO: document method
    this.verifyData = function(profileData) {
        self.getData().then(function(data) {
            for (var prop in profileData) {
                (function(prop) {
                    expect(data[prop]).toEqual(profileData[prop]);
                })(prop);
            }
        });
    }

}

module.exports = Profile;
