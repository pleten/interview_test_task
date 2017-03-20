using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using ssls.Settings;
using ssls.Pages;

namespace ssls.Tests
{
    public class BaseTest
    {
        protected static IWebDriver driver;
        protected bool checkScreenshot;
        protected string methodName;
        protected Home home;
        protected Authorize authorize;
        protected Pages.Profile profile;

        public BaseTest()
        {
            driver = Singleton.getInstance.driver;
            home = new Home();
            authorize = new Authorize();
            profile = new Pages.Profile();
        }
    }
}
