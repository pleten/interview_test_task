using System;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
using testMethods;
using ssls.Settings;


namespace ssls.Pages
{
    public class BasePage
    {
        private IWebDriver driver;

        protected BasePage()
        {
            this.driver = Singleton.getInstance.driver;
            PageFactory.InitElements(this.driver, this);
        }

        public virtual string GetURL()
        {
            return driver.Url;
        }
        
        public virtual void GoToPage() { }

        protected bool Enable(IWebElement element)
        {
            for (int i = 0; i < Int32.Parse(configFiles.getAppValue("timeOut")); i++)
            {
                Thread.Sleep(1000);
                if (element.Displayed && element.Enabled)
                {
                    Thread.Sleep(500);
                    return true;
                }
            }
            return false;
        }
    }
}
