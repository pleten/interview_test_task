const {I} = inject();

module.exports = {
    logInBtn: '[href="/authorize"]',
    userCertificatesBtn: '[href="/user/certificates"]',

    dropdownMenuBtn: '[nc-dropdown-trigger]',

    dropdownMenuItems: {
        logOut: '[ng-click="$ctrl.logout()"]',
        viewProfile: '[ui-sref="user.profile"]',
    }
};
