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
        LoginData registeredUser = new LoginData("ssls.automation+4@gmail.com", "123456");

        [Test]
        public void SupportPinShouldBeUpdated()
        {
            
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

        [Test]
        public void PersonalDataFieldsShouldNotBeEmpty()
        {
            pageService.Navigator.GoToAutorizationPage();
            pageService.LoginService.LoginAs(registeredUser);
            pageService.ProfileNavigator.GoToUserProfilePage();
            PersonalData ViewModeFieldsValues = pageService.PersonalDataService.GetPersonalDataListFromViewMode();
        
            Assert.IsFalse(ViewModeFieldsValues.FullName == null);
            Assert.IsFalse(ViewModeFieldsValues.Email == null);
            Assert.IsFalse(ViewModeFieldsValues.FullPhoneNumber == null);
            Assert.IsFalse(ViewModeFieldsValues.FullAddress == null);
            Assert.IsFalse((ViewModeFieldsValues.SupportPin== null) || (ViewModeFieldsValues.SupportPin == ""));
        }
    }
}
