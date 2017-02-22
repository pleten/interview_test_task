using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Firefox;

namespace Ssl_web_tests
{
    public class NavigationService: BaseClass
    {
        private string baseUrl;

        public NavigationService(): base()
        {
            baseUrl = "https://www.ssls.com";
        }

        public void GoToHomePage()
        {
            if (Driver.Url == baseUrl)
            {
                return;
            }

            Driver.Navigate().GoToUrl(baseUrl);
        }

        public void GoToAutorizationPage()
        {
            Driver.Navigate().GoToUrl(baseUrl + "/authorize");
        }

        public void GoToUserProfilePage()
        {
            Driver.Navigate().GoToUrl(baseUrl + "/user/profile");
        }
    }
}
