export class Locators{    
    public CommonLocators = new class{
        public readonly LOGIN_BTN: string = 'a.btn.flat-dark.ng-scope';
    }
   

    public MainPage = new class{
        readonly LOGIN_BTN: string = 'a.btn.flat-dark.ng-scope';
    }
    
    AuthorizePage = new class{
        readonly LOGIN_BTN: string = 'a.btn.flat-dark.ng-scope';
        readonly EMAIL_FORM_INPT: string = 'input[type*="email"]';
    }
}

