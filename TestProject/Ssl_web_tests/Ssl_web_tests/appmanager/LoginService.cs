using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium;

namespace Ssl_web_tests
{
    public class LoginService: BaseClass
    {
        public Dictionary<string,string> locators = new Dictionary<string, string>();

        public LoginService():base ()
        {
            locators.Add("login", "input[name = 'email']");
            locators.Add("password", "input[name = 'password']");
            locators.Add("submitButton", ".primary");
            locators.Add("loginButton", ".log-box > a:nth-child(1)");
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

        public void SubmitCredentialsToTheServer()
        {
            Driver.FindElement(By.CssSelector(locators["submitButton"])).Click();
        }
    }
}
