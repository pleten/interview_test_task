package Pages;

import Management.Info;
import Management.PageObject;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.FindBys;
import org.openqa.selenium.support.How;
import org.testng.Assert;

import java.util.List;

/**
 * Created by valeriy on 4/1/2017.
 */
public class LoginPage extends PageObject {
    Info info = new Info();
    @FindBy(xpath = "//h1[@class='page-title']")
    private WebElement authorization;
    @FindBy(xpath = "//button[@class='btn-input btn-input-block']")
    private WebElement eye;
    @FindBy(name = "email")
    private WebElement emailField;
    @FindBy(name = "password")
    private WebElement passwordField;
    @FindBy(xpath = "//button[@type='submit']")
    private WebElement loginButton;
    @FindBy(how = How.CLASS_NAME, using = "noty_text")
    private WebElement notification;
    @FindBy(how = How.CLASS_NAME, using = "tooltip-text")
    private WebElement emailErrorTooltip;
    @FindBys(@FindBy(className = "tooltip-text"))
    List<WebElement> toolTips;

    public LoginPage(WebDriver driver) {
        super(driver);
        Assert.assertTrue(authorization.isDisplayed());
    }

    public void clickOnEye() {
        eye.click();
    }

    public void enterLogin(String login) {
        emailField.sendKeys(login);
    }

    public void enterPassword(String password) {
        passwordField.sendKeys(password);
    }

    public HomePage clickLoginButton() {
        loginButton.click();
        return new HomePage(driver);
    }

    public boolean clickLoginButtonForNotification() {
        loginButton.click();
        try {
            Thread.sleep(2000);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return notification.isDisplayed() ? true : false;
    }

    public boolean checkNotificationText(String expectedText) {
        return notification.getText().equals(expectedText);
    }

    public void clickLoginButtonNoAction() {
        loginButton.click();
    }

    public boolean checkToolTipText(int toolTipNumber, String expectedText) {
        return toolTips.get(toolTipNumber).getText().equals(expectedText) ? true : false;
    }
    public void signIn(String login, String password){
        enterLogin(login);
        enterPassword(password);
    }
    public String getEnteredPassword(){
        clickOnEye();
        return passwordField.getAttribute("value");
    }
}