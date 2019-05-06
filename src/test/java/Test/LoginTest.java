package Test;

import Page.LoginPage;
import org.openqa.selenium.support.PageFactory;

public class LoginTest extends BaseTest {
    private LoginPage loginPage = PageFactory.initElements(initDriver(), LoginPage.class);

    public void correctSignIn() throws Exception{
        loginPage.open();
        loginPage.driverOpenWait();
        loginPage.clickLoginBtn();
        loginPage.checkTitle();
        loginPage.fillCorrectUserData();
        loginPage.clickLogBtn();
        loginPage.checkAuthLink();
    }

    public void incorrectSignIn() throws Exception{
        loginPage.open();
        loginPage.driverOpenWait();
        loginPage.clickLoginBtn();
        loginPage.checkTitle();
        loginPage.fillIncorrectUserData();
        loginPage.clickLogBtn();
        loginPage.checkErrorMessage();
    }

    public void unregisteredUser() throws Exception{
        loginPage.open();
        loginPage.driverOpenWait();
        loginPage.clickLoginBtn();
        loginPage.checkTitle();
        loginPage.fillUnregisteredUserData();
        loginPage.clickLogBtn();
        loginPage.checkErrorMessage();
    }

    public void emptyField() throws Exception{
        loginPage.open();
        loginPage.driverOpenWait();
        loginPage.clickLoginBtn();
        loginPage.checkTitle();
        loginPage.clickLogBtn();
        loginPage.checkErrorEmailMessage();
        loginPage.checkErrorPasswordMessage();
    }

    public void logOut() throws Exception{
        loginPage.open();
        loginPage.driverOpenWait();
        loginPage.clickLoginBtn();
        loginPage.checkTitle();
        loginPage.fillCorrectUserData();
        loginPage.clickLogBtn();
        loginPage.checkAuthLink();
        loginPage.logedOut();
        loginPage.checkLoginLink();
    }
}
