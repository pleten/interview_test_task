using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace Ssl_web_tests
{
    public class LoginService: BaseService
    {
        public Dictionary<string,string> locators = new Dictionary<string, string>();

        public LoginService(ApplicationManager manager):base (manager)
        {
            locators.Add("login", "input[name = 'email']");
            locators.Add("password", "input[name = 'password']");
            locators.Add("submitButton", ".primary");
            locators.Add("loginButton", ".log-box > a:nth-child(1)");
            locators.Add("logoutButton", "button[ng-click='logout()']");
        }

       
        public void FillLoginField(string login)
        {
            Driver.FindElement(By.CssSelector(locators["login"])).Clear();
            Driver.FindElement(By.CssSelector(locators["login"])).SendKeys(login);
        }

        public void FillPasswordField(string pass)
        {
            Driver.FindElement(By.CssSelector(locators["password"])).Clear();
            Driver.FindElement(By.CssSelector(locators["password"])).SendKeys(pass);
        }

        public string InvalidEmailMessageText()
        {
           string messageText =  Driver.FindElement(By.CssSelector("div[ng-show='authForm.email.$dirty && (authForm.email.$error.email || authForm.email.$error.pattern)']"))
                                    .FindElement(By.CssSelector("span.tooltip-text")).Text;
            return messageText.Replace("br", " ").Replace("\r\n", " ").Trim();
        }

        public void SubmitCredentialsToTheServer()
        {
            Driver.FindElement(By.CssSelector(locators["submitButton"])).Click();
        }

        public void LoginAs(LoginData userCredentials)
        {
            FillLoginField(userCredentials.Email);
            FillPasswordField(userCredentials.Password);
            SubmitCredentialsToTheServer();
        }

        public string GetLoggedUserName()
        {
            WebDriverWait wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(5));
            return wait.Until(drv => drv.FindElement(By.CssSelector("a[href = '/user/certificates']"))).Text;
                    
        }

        public bool IsLoggedIn(LoginData userCredentials)
        {
            if (GetLoggedUserName() == userCredentials.Email)
            { return true; }
            else
            { return false; }
        }

        public string NotificationMessageText()
        {
            WebDriverWait wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(5));
            return wait.Until(drv => drv.FindElement(By.CssSelector("span.noty_text"))).Text;
           
         }

        public string EmptyEmailFieldMessageText()
        {
            string messageText = Driver.FindElement(By.CssSelector("div[ng-show='(authForm.email.$dirty || authForm.$submitted) && authForm.email.$error.required']"))
                                    .FindElement(By.CssSelector("span.tooltip-text")).Text;
            return messageText.Replace("br", " ").Replace("\r\n", " ").Trim();
        }

        public string EmptyPasswordFieldMessageText()
        {
            string messageText = Driver.FindElement(By.CssSelector("div[ng-show='(authForm.password.$dirty || authForm.$submitted) && authForm.password.$error.required']"))
                                    .FindElement(By.CssSelector("span.tooltip-text")).Text;
            return messageText.Replace("br", " ").Replace("\r\n", " ").Trim();
        }

        public void Logout()
        {
            manager.ProfileNavigator.OpenDropdownMenu();
            InitLogout();
            WaitUntilPageIsLoaded(5);
        }
        

        public void InitLogout()
        {
            Driver.FindElement(By.CssSelector(locators["logoutButton"])).Click();
        }


    }
}
