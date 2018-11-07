export class Locators{    
    public CommonLocators = new class{
        public readonly LOGIN_BTN: string = 'a.btn.flat-dark.ng-scope';
    }
   

    public MainPage = new class{
        readonly LOGIN_BTN: string = 'a.btn.flat-dark.ng-scope';
    }
    
    AuthorizePage = new class{
        readonly LOGIN_BTN: string = 'button.btn.block.primary';
        readonly EMAIL_FORM_INPT: string = 'input[type*="email"]';
        readonly PASSWORD_FORM_INPT: string = 'input[placeholder*="password"]';
        readonly SHOW_PASSWORD_BTN: string = 'button.btn-input.btn-input-block';
        readonly USER_EMAIL_BTN: string = 'a.btn.btn-s.round.filled.user-btn.ng-binding';
        readonly EMAIL_ERROR_SPN: string = 'span[class*="noty_text"]';
        readonly FIELD_ERROR_SPN: string = 'span[class*="tooltip-text"]';
        readonly ACCOUNT_ACTIONS_BTN: string = 'button.btn.btn-s.round.filled.dropdown-btn.ng-isolate-scope';
        readonly LOG_OUT_BTN: string = 'button.drop-button';
    }
}

