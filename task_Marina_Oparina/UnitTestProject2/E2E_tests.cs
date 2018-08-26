using E2ETests_steps;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System.Linq;

namespace E2E_tests
{
    class Tests: E2ESteps
    {
        public string Email = "ssls.automation+5@gmail.com";
        public string password = "123456";
        public string homeTitle = "SSL Certificates. Buy Cheap SSL Certs from $5.88/yr";

        //1.Authorization page (Welcome back!)
        [Test]
        public void AuthorizationPageWelcomeBack()
        {
            driver.Title.Equals(homeTitle);

            ClickLogIn();

            WaitUntilPageLoad("Sign In | SSLs.com");

            EnterLogInData(Email, password);
            driver.FindElement(By.CssSelector(".icon.icon-eye")).Click();

            Assert.AreEqual("text", driver.FindElement(By.Name("password")).GetAttribute("type"));
            Assert.AreEqual(password, driver.FindElement(By.Name("password")).GetAttribute("value"));

            ClickSubmitButton();

            Assert.IsTrue(driver.FindElement(By.XPath("//*[contains(@class,'filled user-btn') and text()='ssls.automation+5@gmail.com']")).Displayed);
        }

        //2. Authorization page. Not registered user
        [Test]
        public void AuthorizationNotRegisteredUser()
        {
            var Email = "automation@gmail.com";
            var password = "121212";
            var homeTitle = "SSL Certificates. Buy Cheap SSL Certs from $5.88/yr";

            driver.Title.Equals(homeTitle);

            ClickLogIn();
            EnterLogInData(Email, password);
            driver.FindElement(By.CssSelector(".btn.block.primary[type = submit]")).Click();

            var messageLocator = By.CssSelector(".noty_message.message");
            wait.Until(driver => driver.FindElement(messageLocator));

            Assert.AreNotEqual(driver.FindElement(messageLocator), "Uh oh! Email or password is incorrect");
        }

        //3. Authorization page. Invalid email
        [Test]
        public void AuthorizationPageInvalidEmail()
        {
            var Email = "test@@test.com";
            var password = "123456";
            var homeTitle = "SSL Certificates. Buy Cheap SSL Certs from $5.88/yr";

            driver.Title.Equals(homeTitle);

            ClickLogIn();
            EnterLogInData(Email, password);
            ClickSubmitButton();

            var messageLocator = By.CssSelector(".tooltip-text");
            Assert.AreEqual("Uh oh! This isn’t an email should be displayed", driver.FindElement(messageLocator).Text.Replace("\r\n", " "));
        }

        //4. Authorization page. Empty fields
        [Test]
        public void AuthorizationPageEmptyFields()
        {
            var homeTitle = "SSL Certificates. Buy Cheap SSL Certs from $5.88/yr";

            driver.Title.Equals(homeTitle);

            ClickLogIn();
            ClickSubmitButton();
            var form = driver.FindElement(By.Name("authForm"));
            var emailError = form.FindElement(By.XPath("//*[@class='form-group email']//*[@class='left-tooltip-box']"));
            var passwError = form.FindElement(By.XPath("//*[@class='form-group']//*[@class='left-tooltip-box']"));
            Assert.AreEqual("Oops, please enter your email", emailError.Text.Replace("\r\n", " "));
            Assert.AreEqual("Looks like you’ve missed this one should be displayed", passwError.Text.Replace("\r\n", " "));
        }

        //5. Log Out
        [Test]
        public void LogOut()
        {
            LogIn(Email,password);

            ClickFromUserMenu("Log out");
            Assert.IsTrue(driver.FindElement(By.XPath("//*[@class='log-box']//*[text()='Log in']")).Displayed);
            Assert.AreEqual("https://www.ssls.com/authorize", driver.Url);
        }

        //6.  My profile page. Client area
        [Test]
        public void ProfilePageClientArea()
        {
            LogIn(Email, password);

            ClickFromUserMenu("View profile");
            //.Split(new[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries).
            var terms = driver.FindElements(By.CssSelector(".panel.inline-panel .terms")).Where(x => x.Displayed).Select(x => x.Text).ToArray();
            var description = driver.FindElements(By.CssSelector(".panel.inline-panel .description")).Where(x => x.Displayed).Select(x => x.Text).ToArray();
            ClickFromUserMenu("Log out");

            AuthorizationPageWelcomeBack();
            ClickFromUserMenu("View profile");
            WaitUntilPageLoad("My Profile | SSLs.com");
            for (int i = 0; i < terms.Count(); i++)
            {
                Assert.AreEqual(description[i], driver.FindElement(By.XPath($"//*[@class='terms' and child::*[text()='{terms[i]}']]/following-sibling::*[@class='description']")).Text);
            }
        }


        //7. My profile page. Refresh support pin
        [Test]
        public void MyProfilePageRefreshSupportPin()
        {
            LogIn(Email, password);
            ClickFromUserMenu("View profile");
            var pinLocator = By.XPath($"//*[@class='terms' and child::*[text()='Support pin']]/following-sibling::*[@class='description']");
            var actualPin = driver.FindElement(pinLocator).Text;
            driver.FindElement(By.Name("supportPin")).Click();
            wait.Until(ExpectedConditions.InvisibilityOfElementWithText(pinLocator, actualPin));
            var updatedPin = driver.FindElement(pinLocator).Text;
            Assert.AreNotEqual(actualPin, updatedPin);
        }





    }


}
