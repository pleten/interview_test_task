package Page;

import Data.User.SignInUsersData;
import Utils.ConfigProperties;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends BasePage {

    @FindBy(xpath = "//div[2]/div[4]/div[1]/a")
    private WebElement loginBtn;

    @FindBy(tagName = "h1")
    private WebElement title;

    @FindBy(xpath = "//ng-include//form/div[1]/div/input")
    private WebElement emailField;

    @FindBy(xpath = "//ng-include//form/div[2]/div/div[1]/div[1]/input")
    private WebElement passwordField;

    @FindBy(xpath = "//ng-include/div/div/form/div[3]/button")
    private WebElement logBtn;

    @FindBy(xpath = "//div[4]/div[1]/div/a")
    private WebElement authLink;

    @FindBy(xpath = "//*[@id=\"noty_655585505715574000\"]/div/span")
    private WebElement errorMessage;

    @FindBy(xpath = "//form/div[1]/div/div[2]/div/div[1]/span")
    private WebElement errorMessageEmail;

    @FindBy(xpath = "//form/div[2]/div/div[2]/div/div[1]/span")
    private WebElement errorMessagePassword;

    @FindBy(xpath = "//div[2]/div[4]/div[1]/div/button")
    private WebElement dropdownBtn;

    @FindBy(xpath = "//div[4]/div[1]/div/ul/li[7]/button")
    private WebElement logOutBtn;


    public LoginPage(WebDriver driver){
        super(driver);
    }

    public LoginPage clickLoginBtn(){
        loginBtn.click();
        return new LoginPage(driver);
    }

    public LoginPage checkTitle(){
        checkText(title,"Authorization");
        return new LoginPage(driver);
    }

    public LoginPage fillCorrectUserData(){
        type(emailField, SignInUsersData.VALID.getLoginEmail());
        type(emailField, SignInUsersData.VALID.getLoginPassword());
        return PageFactory.initElements(driver, LoginPage.class);
    }

    public LoginPage fillIncorrectUserData(){
        type(emailField, SignInUsersData.INVALID.getLoginEmail());
        type(emailField, SignInUsersData.INVALID.getLoginPassword());
        return PageFactory.initElements(driver, LoginPage.class);
    }

    public LoginPage fillUnregisteredUserData(){
        type(emailField, SignInUsersData.UNREGISTERED.getLoginEmail());
        type(emailField, SignInUsersData.UNREGISTERED.getLoginPassword());
        return PageFactory.initElements(driver, LoginPage.class);
    }

    public LoginPage clickLogBtn(){
        logBtn.click();
        return new LoginPage(driver);
    }

    public LoginPage checkAuthLink(){
        isElementPresent(authLink);
        return new LoginPage(driver);
    }

    public LoginPage checkErrorMessage(){
        checkText(errorMessage,"Uh oh! Email or password is incorrect");
        return new LoginPage(driver);
    }

    public LoginPage checkErrorEmailMessage(){
        checkText(errorMessageEmail,"Oops, please enter your email");
        return new LoginPage(driver);
    }

    public LoginPage checkErrorPasswordMessage(){
        checkText(errorMessagePassword,"Looks like you’ve missed this one");
        return new LoginPage(driver);
    }

    public LoginPage logedOut(){
        dropdownBtn.click();
        logOutBtn.click();
        return new LoginPage(driver);
    }

    public LoginPage checkLoginLink(){
        isElementPresent(loginBtn);
        return new LoginPage(driver);
    }

    @Override
    public void open() {
        driver.get(ConfigProperties.getProperty("login.url"));
    }

    public void driverOpenWait() {
        WebDriverWait wait = new WebDriverWait(driver, 20);
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//div[2]/div[4]/div[1]/a")));
    }

}