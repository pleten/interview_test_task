using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using System.IO;
using Newtonsoft.Json;

namespace Ssl_web_tests.Tests
{
    [TestFixture]
    public class UserProfileTests:BasicTestClass
    {
        [Test]
        public void SupportPinShouldBeUpdated()
        {
            LoginData registeredUser = new LoginData("ssls.automation+4@gmail.com", "123456");

            //pre-condition
            pageService.Navigator.GoToAutorizationPage();
            pageService.LoginService.LoginAs(registeredUser);
            pageService.ProfileNavigator.GoToUserProfilePage();

            string oldSupportPin = pageService.PersonalDataService.GetCurrentPin();
            // actions
            pageService.PersonalDataService.InitSupportPinChanging();

            string updatedSupportPin = pageService.PersonalDataService.GetCurrentPin();
            //verification
            Assert.AreNotEqual(oldSupportPin, updatedSupportPin);
        }
    }
}
