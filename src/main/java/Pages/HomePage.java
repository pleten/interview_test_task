package Pages;

import Management.PageObject;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * Created by valeriy on 4/1/2017.
 */
public class HomePage extends PageObject {
    @FindBy(xpath = "//a[@href='/authorize']")
    private WebElement loginButton;
    @FindBy(xpath = "//div[@class='browser-greenbar']")
    private WebElement greenBar;
    @FindBy(xpath = "//a[@href='/user/certificates']")
    private WebElement authorizationButton;
    @FindBy(xpath = "//button[contains(@nc-dropdown-trigger,'statusOpened')]")
    private WebElement authorizationDropDownArrow;
    @FindBy(xpath = "//button[contains(.,'Log out')]")
    private WebElement logOutLink;

    public HomePage(WebDriver driver) {
        super(driver);
        Assert.assertTrue(greenBar.isDisplayed());
    }

    public LoginPage clickLoginButton() throws InterruptedException {
        loginButton.click();
        try {
            Thread.sleep(2000);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new LoginPage(driver);
    }

    public String getAuthorizationButtonEmail() {
        return authorizationButton.getText();
    }

    public boolean authorizationDropDownArrowDisplayed() {
        return authorizationDropDownArrow.isDisplayed() ? true : false;
    }

    public LoginPage logOut() {
        clickAuthorizationDropDownArrow();
        logOutLink.click();
        return new LoginPage(driver);
    }

    public void clickAuthorizationDropDownArrow() {
        authorizationDropDownArrow.click();
    }

    public boolean checkPageUrl(String expectedUrl) {
        return driver.getCurrentUrl().equals(expectedUrl);
    }
}
