using System;
using System.Threading;
using System.Collections.Generic;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
using testMethods;
using ssls.Settings;

namespace ssls.Pages
{
    public class Authorize:BasePage
    {
        private IWebDriver driver;

        public Authorize()
        {
            this.driver = Singleton.getInstance.driver;
            PageFactory.InitElements(this.driver, this);
        }

        public override string GetURL()
        {
            Enable(InputEmail);
            return driver.Url;
        }

        public override void GoToPage()
        {
            driver.Navigate().GoToUrl(configFiles.getAppValue("baseUrl") + "/authorize");
        }
        
        [FindsBy(How = How.Name, Using = "email")]
        IWebElement InputEmail { get; set; }
        public void EnterEmail(string email)
        {
            InputEmail.Clear();
            InputEmail.SendKeys(email);
        }

        [FindsBy(How = How.Name, Using = "password")]
        IWebElement InputPassword { get; set; }
        public void EnterPassword(string email)
        {
            InputPassword.Clear();
            InputPassword.SendKeys(email);
        }

        [FindsBy(How = How.CssSelector, Using = ".btn-input.btn-input-block")]
        IWebElement EyePassword { get; set; }

        public string GetShowPassword()
        {
            EyePassword.Click();
            return InputPassword.GetAttribute("value");
        }

        [FindsBy(How = How.CssSelector, Using = ".btn.block.primary")]
        IWebElement BtnLogin { get; set; }

        public void ClickButonLogin()
        {
            BtnLogin.Click();
        }

        [FindsBy(How = How.CssSelector, Using = ".link.unstressed.ng-scope")]
        IWebElement LinkForgot { get; set; }

        public void clickLinkForgot()
        {
            LinkForgot.Click();
        }

        [FindsBy(How = How.CssSelector, Using = ".notification.information")]
        IWebElement Notification { get; set; }

        [FindsBy(How = How.CssSelector, Using = ".noty_text")]
        IWebElement NotificationText { get; set; }

        public string GetGetErrorMessage()
        {
            Enable(Notification);
            return NotificationText.Text;
        }

        [FindsBy(How = How.CssSelector, Using = ".tooltip.tooltip-error")]
        IWebElement TooltipMessage { get; set; }

        [FindsBy(How = How.CssSelector, Using = ".tooltip-text")]
        IList<IWebElement> TooltipsText { get; set; }

        public string GetGetTooltipError(int errorNumber)
        {
            Enable(TooltipMessage);
            string original = TooltipsText[errorNumber].Text;
            string part1 = original.Substring(0, original.IndexOf("\r\n"));
            string part2 = original.Substring(original.IndexOf("\r\n") + 2);
            string result = part1 + " " + part2;
            return result;
        }
    }
}
