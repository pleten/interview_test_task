using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Ssl_web_tests
{
    public class ApplicationManager
    {
        public IWebDriver Driver { get; set; }

        public string BaseUrl { get; set; }

        public LoginService LoginService { get; set; }
        public NavigationService Navigator { get; set; }


        private static ThreadLocal<ApplicationManager> pageSerive = new ThreadLocal<ApplicationManager>();

        

        private ApplicationManager()
        {
            Driver = new FirefoxDriver();
            BaseUrl = "https://www.ssls.com";
            LoginService = new LoginService(this);
            Navigator = new NavigationService(this, BaseUrl);
        }

        ~ApplicationManager()
        {
            try
            {
                Driver.Quit();
            }
            catch (Exception)
            {
                // Ignore errors if unable to close the browser
            }
        }


        public static ApplicationManager GetInstance()
        {
            if (!pageSerive.IsValueCreated)
            {
                ApplicationManager newInstance = new ApplicationManager();
                newInstance.Navigator.GoToHomePage();
                pageSerive.Value = newInstance;
            }
            return pageSerive.Value;
        }

    }
}
