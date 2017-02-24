using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Firefox;

namespace Ssl_web_tests
{
    public class NavigationService: BaseService
    {
        public NavigationService(ApplicationManager manager) : base(manager)
        { }

        public void GoToHomePage()
        {
            if (Driver.Url == manager.BaseUrl)
            {
                return;
            }

            Driver.Navigate().GoToUrl(manager.BaseUrl);
        }

        public void GoToAutorizationPage()
        {
            if (Driver.Url == (manager.BaseUrl + "/authorize"))
            {
                return;
            }
            Driver.Navigate().GoToUrl(manager.BaseUrl + "/authorize");
            if (Driver.Url != (manager.BaseUrl + "/authorize"))
            {
                manager.LoginService.Logout();
                Driver.Navigate().GoToUrl(manager.BaseUrl + "/authorize");
            }
        }

        public string GetCurrentUrl()
        {
            return Driver.Url;
        }

       
    }
}
