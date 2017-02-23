using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;


namespace Ssl_web_tests
{
    [TestFixture]
    public class LoginVerificationTests: BasicTestClass
    {
        [Test]
        public void ShouldSuccessfullyLoginAsRegisteredUser()
        {
            LoginData registeredUser = new LoginData("ssls.automation+4@gmail.com", "123456");
            pageService.Navigator.GoToAutorizationPage();
            pageService.LoginService.LoginAs(registeredUser);
            Assert.IsTrue(pageService.LoginService.IsLoggedIn(registeredUser));
        }

        [Test]
        public void ShouldntBeLoggedInAsNotRegisteredUser()
        {
            LoginData notRegisteredUser = new LoginData("email@address.com", "123456789");
            pageService.Navigator.GoToAutorizationPage();
            pageService.LoginService.LoginAs(notRegisteredUser);

            string expectedMessageText = "Uh oh! Email or password is incorrect";
            string expectedURL = pageService.BaseUrl + "/authorize";

            Assert.AreEqual(expectedURL, pageService.Navigator.GetCurrentUrl());
            Assert.AreEqual(expectedMessageText, pageService.LoginService.NotificationMessageText());
        }

    }
}
