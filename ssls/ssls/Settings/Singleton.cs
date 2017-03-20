using OpenQA.Selenium;
using testMethods;

namespace ssls.Settings
{
    class Singleton
    {
        private static Singleton instance;
        public IWebDriver driver { get; private set; }
        private Singleton()
        {
            configFiles.setConfiguration(@"C:\test\settings\configuration\ssls\main.config");

            driver = customMethods.currentBrowser();
            driver.Manage().Window.Maximize();
        }
        public static Singleton getInstance
        {
            get
            {
                if (instance == null)
                    instance = new Singleton();
                return instance;
            }
        }
    }
}
