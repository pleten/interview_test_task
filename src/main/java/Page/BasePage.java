package Page;

import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.Assert;

import static org.testng.Assert.assertTrue;

public abstract class BasePage {
    protected WebDriver driver;
    public BasePage(WebDriver driver){
        this.driver=driver;
    }

    protected void type(WebElement webElement, String text) {
        webElement.clear();
        webElement.sendKeys(text);
    }

    protected boolean isElementPresent(WebElement element) {
        try {
            element.isDisplayed();
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    protected boolean checkText(WebElement element, String text) {
        try {
            String str = element.getText();
            Assert.assertEquals(str, text);
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    protected boolean checHTMLAttribute(WebElement element, String attribute, String answere) {
        try {
            String str = element.getAttribute(attribute);
            assertTrue(str.contains(answere));
            return true;
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    protected boolean checkValueIsNotTrue(WebElement element, String val){
        try {
            String str = element.getText();
            if(str != val)
            {

            }
                return true;

        } catch (NoSuchElementException e) {
            return false;
        }
    }



    public abstract void open();
}
