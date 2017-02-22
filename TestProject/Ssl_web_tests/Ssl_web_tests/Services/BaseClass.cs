using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace Ssl_web_tests
{
    public class BaseService
    {
        public IWebDriver Driver { get; set; }
        protected ApplicationManager manager;

        public BaseService()
        {
            Driver = new FirefoxDriver();
        }

        public BaseService(ApplicationManager manager)
        {
            this.manager = manager;
            this.Driver = manager.Driver;
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
