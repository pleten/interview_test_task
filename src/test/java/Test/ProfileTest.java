package Test;

import Page.LoginPage;
import Page.ProfilePage;
import org.openqa.selenium.support.PageFactory;

public class ProfileTest extends BaseTest {
    private LoginPage loginPage = PageFactory.initElements(initDriver(), LoginPage.class);
    private ProfilePage profilePage = PageFactory.initElements(initDriver(),ProfilePage.class);

    public void checkProfileData() throws Exception{
        loginPage.open();
        loginPage.clickLoginBtn();
        loginPage.checkTitle();
        loginPage.fillCorrectUserData();
        loginPage.clickLogBtn();
        loginPage.checkAuthLink();
        profilePage.openDropDownMenu();
        profilePage.clickProfile();
        profilePage.checkTitle();
        profilePage.checkUserName();
        profilePage.checkUserEmail();
        profilePage.checkUserPassword();
        profilePage.checkUserPhone();
        profilePage.checkUserAddress();
        profilePage.checkSupportPin();
        profilePage.checkToggleBtnOn();
    }

    public void checkChangeToggleBtn() throws Exception{
        loginPage.open();
        loginPage.clickLoginBtn();
        loginPage.checkTitle();
        loginPage.fillCorrectUserData();
        loginPage.clickLogBtn();
        loginPage.checkAuthLink();
        profilePage.openDropDownMenu();
        profilePage.clickProfile();
        profilePage.checkTitle();
        profilePage.checkSupportPin();
        profilePage.clickChangePinBtn();
        profilePage.checkPinResult();
    }



}
