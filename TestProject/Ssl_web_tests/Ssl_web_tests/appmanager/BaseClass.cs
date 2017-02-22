using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace Ssl_web_tests
{
    public class BaseClass
    {
        public IWebDriver Driver { get; set; }

        public BaseClass()
        {
            Driver = new FirefoxDriver();
        }

        public BaseClass(IWebDriver driver)
        {
            this.Driver = driver;
        }

        public bool IsElementPresent(By by)
        {
            try
            {
                Driver.FindElement(by);
                return true;
            }
            catch (NoSuchElementException)
            {
                return false;
            }
        }

    }
}
