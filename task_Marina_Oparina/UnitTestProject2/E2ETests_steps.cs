using System;
using NUnit.Framework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace E2ETests_steps
{
    [TestClass]
    public class E2ESteps
    {
        public IWebDriver driver;
        public WebDriverWait wait;

        [SetUp]
        public void RunDriver()
        {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
        }
        [SetUp]
        public void startApp()
        {
            driver.Navigate().GoToUrl("https://ssls.com");
        }
        public void ClickLogIn()
        {
            driver.FindElement(By.ClassName("log-box")).Click();
        }

        public void EnterLogInData(string email, string password)
        {
            driver.FindElement(By.CssSelector("input[placeholder=Email]")).SendKeys(email);
            driver.FindElement(By.Name("password")).SendKeys(password);
            driver.FindElement(By.XPath("//button[@type='submit' and text()='Login']"));
        }

        public void ClickSubmitButton()
        {
            driver.FindElement(By.CssSelector(".btn.block.primary[type = submit]")).Click();
        }

        public void WaitUntilPageLoad(string pageName)
        {
            wait.Until(driver => driver.Title.Equals(pageName));
        }

        public void ClickFromUserMenu(string buttonName)
        {
            driver.FindElement(By.CssSelector("[nc-dropdown-trigger='statusOpened']")).Click();
            var userdropdown = driver.FindElement(By.CssSelector("[nc-dropdown='statusOpened']"));
            userdropdown.FindElement(By.XPath($"//*[text()='{buttonName}']")).Click();
        }

        public void LogIn(string Email,string password)
        {
            ClickLogIn();

            WaitUntilPageLoad("Sign In | SSLs.com");

            EnterLogInData(Email, password);
            ClickSubmitButton();
        }

        

        [TearDown]
        public void stop()
        {
            driver.Quit();
        }
    }
}
