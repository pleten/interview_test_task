const viewProfileButton = $('a[href="/user/profile"]');
const allUserData = $$('.description > span.text');
const refreshPinButton = $('span.icon-arrows-cw');

export default class MyProfilePage {
  goToViewProfile() {
    return viewProfileButton.click();
  }

  returnAllUserDataInformation() {
    return allUserData;
  }

  refreshPin() {
    refreshPinButton.click();
  }
}