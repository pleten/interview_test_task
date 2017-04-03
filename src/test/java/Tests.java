import Management.DriverManagement;
import Pages.HomePage;
import Pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Created by valeriy on 4/1/2017.
 */
public class Tests extends DriverManagement {
    private LoginPage loginPage;
    private HomePage homePage;

    @Test(priority = 0)
    public void registeredUserShouldLogIn() throws InterruptedException {
        driver.get(url);
        homePage = new HomePage(driver);
        loginPage = homePage.clickLoginButton();
        loginPage.signIn(login, password);
        Assert.assertEquals(loginPage.getEnteredPassword(), password);
        homePage = loginPage.clickLoginButton();
        Assert.assertEquals(homePage.getAuthorizationButtonEmail(), login);
        Assert.assertTrue(homePage.authorizationDropDownArrowDisplayed());
        homePage.logOut();
    }

    @Test(priority = 1)
    public void unregisteredUserShouldNotLogIn() throws InterruptedException {
        String pw = "456782";
        driver.get(url);
        homePage = new HomePage(driver);
        loginPage = homePage.clickLoginButton();
        loginPage.signIn("somebody@gmail.com", pw);
        Assert.assertEquals(loginPage.getEnteredPassword(), pw);
        Assert.assertTrue(loginPage.clickLoginButtonForNotification());
        Assert.assertTrue(loginPage.checkNotificationText("Uh oh! Email or password is incorrect"));
    }

    @Test(priority = 2)
    public void userWithIncorrectEmailShouldNotLogIn() throws InterruptedException {
        driver.get(url);
        homePage = new HomePage(driver);
        loginPage = homePage.clickLoginButton();
        loginPage.signIn("test@@test.com", password);
        Assert.assertEquals(loginPage.getEnteredPassword(), password);
        loginPage.clickLoginButtonNoAction();
        Assert.assertTrue(loginPage.checkToolTipText(0, "Uh oh! This\n" + "isn’t an email"));
    }

    @Test(priority = 3)
    public void userShouldNotLogInWithEmptyFields() throws InterruptedException {
        driver.get(url);
        homePage = new HomePage(driver);
        loginPage = homePage.clickLoginButton();
        loginPage.clickLoginButtonNoAction();
        Assert.assertTrue(loginPage.checkToolTipText(1, "Oops, please\n" + "enter your email"));
        Assert.assertTrue(loginPage.checkToolTipText(2, "Looks like you’ve\n" + "missed this one"));
    }

    @Test(priority = 4)
    public void userShouldLogOut() throws InterruptedException {
        driver.get(url);
        homePage = new HomePage(driver);
        loginPage = homePage.clickLoginButton();
        loginPage.signIn(login, password);
        homePage = loginPage.clickLoginButton();
        loginPage = homePage.logOut();
        Assert.assertTrue(homePage.checkPageUrl("https://www.ssls.com/authorize"));
    }
}

