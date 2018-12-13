class MainPage {

    constructor(){
        browser.ignoreSynchronization = false;
    }

    get userButton() {
        return $('a.user-btn');
    }
}