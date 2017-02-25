using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ssl_web_tests
{
    public class UserProfileNavigationService : BaseService
    {
        public Dictionary<string, string> userProfileMenuItems = new Dictionary<string, string>();

        public UserProfileNavigationService(ApplicationManager manager) : base(manager)
        {
            userProfileMenuItems.Add("openDropdownMenu","button.dropdown-btn");
        }

        public void GoToUserProfilePage()
        {
            Driver.Navigate().GoToUrl(manager.BaseUrl + "/user/profile");
        }

        public void OpenDropdownMenu()
        {
            WebDriverWait wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(5));
           IWebElement openDropdownMenu = wait.Until(drv => drv.FindElement(By.CssSelector(userProfileMenuItems["openDropdownMenu"])));
            openDropdownMenu.Click();
        }

    }
}
