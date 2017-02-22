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

    }
}
