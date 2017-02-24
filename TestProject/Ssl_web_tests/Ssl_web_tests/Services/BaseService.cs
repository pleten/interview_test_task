using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;
using System;

namespace Ssl_web_tests
{
    public class BaseService
    {
        public IWebDriver Driver { get; set; }
        protected ApplicationManager manager;

        public BaseService()
        {
            FirefoxOptions firefoxOptions = new FirefoxOptions
            {
                UseLegacyImplementation = true
            };

            Driver = new FirefoxDriver(FirefoxDriverService.CreateDefaultService(), firefoxOptions, TimeSpan.FromSeconds(30));
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

        public void WaitUntilPageIsLoaded(int timeout)
        {
            var now = DateTime.Now;
            WebDriverWait wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(timeout));
            wait.PollingInterval = TimeSpan.FromSeconds(timeout);
            wait.Until(wd => (DateTime.Now - now) - TimeSpan.FromSeconds(timeout) > TimeSpan.Zero);
        }

    }
}
