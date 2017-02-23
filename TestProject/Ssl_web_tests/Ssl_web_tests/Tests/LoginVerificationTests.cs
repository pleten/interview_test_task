using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using System.IO;
using Newtonsoft.Json;


namespace Ssl_web_tests
{
    [TestFixture]
    public class LoginVerificationTests: BasicTestClass
    {
        public static IEnumerable<LoginData> LoginCredentialsFromJsonFile()
        {
            string assemblyPath = NUnit.Framework.Internal.AssemblyHelper.GetAssemblyPath(typeof(LoginVerificationTests).Assembly);
            string dir = Path.GetDirectoryName(assemblyPath);
            return JsonConvert.DeserializeObject<List<LoginData>>(File.ReadAllText(dir + @"\credentials.json"));
        }

        [Test, TestCaseSource("LoginCredentialsFromJsonFile")]
        public void WarningMessageDisplayingDueToInvalidEmail(LoginData userCredentials)
        {
            pageService.Navigator.GoToAutorizationPage();
            pageService.LoginService.LoginAs(userCredentials);

            string expectedTooltipText = "Uh oh! This isn’t an email";

            Assert.AreEqual(expectedTooltipText, pageService.LoginService.InvalidEmailMessageText());
        }


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
        //[Test]
        //public void 
    }
}
