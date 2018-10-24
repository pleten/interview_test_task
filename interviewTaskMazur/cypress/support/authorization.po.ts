export class AuthorizationPo {
  pageUrl = '/authorize';

  selEmailInp = '.email input';
  selPasswordInp = '.password input';
  selEyeIcon = '.icon-eye';
  selBtn = 'form button';
  selNotification = '.notification';
  selNotificationText = '.noty_text';
  selEmailError = '.email .tooltip-error';
  selErrorText = '.tooltip-text';
  selPassError = '.form-group .tooltip-error';

  emailLog = 'ssls.automation+5@gmail.com';
  passLog = '123456';
  emailNotRegistered = 'not-registered@gmail.com';
  emailInValid = 'test@@test.com';
  notifyNotRegistered = 'Uh oh! Email or password is incorrect';
  notifyInvalidEmail = 'isn’t an email';
  notifyEmptyEmail = 'enter your email';
  notifyEmptyPass = 'missed this one';
}
