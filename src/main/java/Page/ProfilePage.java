package Page;

import Utils.ConfigProperties;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class ProfilePage extends BasePage {

    @FindBy(xpath = "//div[2]/div[4]/div[1]/div/button")
    private WebElement dropdownBtn;

    @FindBy(xpath = "//div[1]/div/ul/li[5]/a")
    private WebElement viewProfileLink;

    @FindBy(tagName = "h1")
    private WebElement profileTitle;

    @FindBy(xpath = "//form/div[1]/div[2]/span")
    private WebElement userName;

    @FindBy(xpath = "//form/div[2]/div[2]/span")
    private WebElement userEmail;

    @FindBy(xpath = "//div/form/div[3]/div[2]")
    private WebElement userPassword;

    @FindBy(xpath = "//form/div[4]/div[2]/span")
    private WebElement userPhone;

    @FindBy(xpath = "//form/div[5]/div[2]/span")
    private WebElement userAddress;

    @FindBy(xpath = "//form/div[6]/div[2]/span")
    private WebElement supportPin;

    @FindBy(xpath = "//form/div[7]/div[2]/button")
    private WebElement toggleBtn;

    @FindBy(xpath = "//form/div[6]/button")
    private WebElement changePinBtn;


    public ProfilePage(WebDriver driver){
        super(driver);
    }

    public ProfilePage openDropDownMenu(){
        dropdownBtn.click();
        return new ProfilePage(driver);
    }

    public ProfilePage clickProfile(){
        viewProfileLink.click();
        return new ProfilePage(driver);
    }

    public ProfilePage checkTitle(){
        checkText(profileTitle,"Profile");
        return new ProfilePage(driver);
    }

    public ProfilePage checkUserName(){

        checkText(userName,"Vasya Pupkin");
        return new ProfilePage(driver);
    }

    public ProfilePage checkUserEmail(){
        checkText(userEmail,"ssls.automation+5@gmail.com");
        return new ProfilePage(driver);
    }

    public ProfilePage checkUserPassword(){
        isElementPresent(userPassword);
        return new ProfilePage(driver);
    }

    public ProfilePage checkUserPhone(){
        checkText(userPhone, "+380 57123456789");
        return new ProfilePage(driver);
    }

    public ProfilePage checkUserAddress(){
        checkText(userAddress,"Diagon alley 2, Misto, Uryupinsk 612120, Ukraine");
        return new ProfilePage(driver);
    }

    public ProfilePage checkSupportPin(){
        checkText(supportPin,"WSwS");
        return new ProfilePage(driver);
    }

    public ProfilePage checkToggleBtnOn(){
        checHTMLAttribute(toggleBtn,"class", "toggle-btn on");
        return new ProfilePage(driver);
    }

    public ProfilePage clickChangePinBtn(){
        changePinBtn.click();
        return new ProfilePage(driver);
    }

    public ProfilePage checkPinResult(){
        checkValueIsNotTrue(supportPin, "WSwS");
        return new ProfilePage(driver);
    }


    @Override
    public void open() {
        driver.get(ConfigProperties.getProperty("login.url"));
    }
}
