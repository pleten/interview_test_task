export const emailInputXpath = "//form[@name='authForm']//input[@name='email']";
export const passwordInputXpath = "//form[@name='authForm']//input[@name='password']";
export const passwordDisplayedInputXpath = "//form[@name='authForm']//input[@name='password' and @type='text']";
export const EyeButtonXpath = "//form[@name='authForm']//button[contains(@class,'btn-input')]";
export const loginBtnXpath = "//button[(@type='submit') and (.='Login')]";
export const errorMessageBoxXpath = "//div[@class='noty_message message']/span[@class='noty_text']";
export const invalidEmailErrorLabelXpath = "(//div[@class='form-group email']//div[@class='tooltip-box tooltip-box-error']//span)[1]";
export const errorTextNotFilledEmailInputXpath = "(//div[1]/span[@class = 'tooltip-text' and contains(text(), 'Oops, please')])";
export const errorTextNotFilledPasswordInputXpath = "(//div[1]/span[@class = 'tooltip-text' and contains(text(), 'Looks like you’ve')])";
