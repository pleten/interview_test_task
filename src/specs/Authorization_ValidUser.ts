import { MainPO } from "../po/main";

describe('Test Authorization page', function() {
    let mainPage: MainPO = new MainPO();
    it('Tests authorization with correct credentials', function() {
        mainPage.get();
    });

});
