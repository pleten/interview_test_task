using Microsoft.VisualStudio.TestTools.UnitTesting;
using testMethods;

namespace ssls.Tests
{
    [TestClass]
    public class Profile:BaseTest
    {
        [TestInitialize]
        public void Setup()
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
            authorize.GoToPage();
            authorize.EnterEmail(configFiles.getAppValue("userLogin"));
            authorize.EnterPassword(configFiles.getAppValue("userPassword"));
            authorize.ClickButonLogin();
            checkScreenshot = true;
        }

        [TestMethod]
        public void Test6()// My profile page. Client area
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.UserMenuGoToProfile();
            string name = "one";
            string lastName = "two";
            int emailNum = int.Parse(configFiles.getAppValue("emailNum"));
            string email = configFiles.getAppValue("emailName") + (++emailNum) + configFiles.getAppValue("emailDomen");
            string code = "+1";
            string number = "1234567";
            string street = "MyStreet";
            string city = "MyCity";
            string state = "MyState";
            string zipCode = "12345";
            string country = "Ukraine";
            string oldPin = profile.GetSupportPin();
            bool newsState = profile.GetkNewsState();
            profile.EnterName(name, lastName);
            profile.EnterEmail(email);
            profile.EnterPhone(code, number);
            profile.EnterAddress(street, city, state, zipCode, country);
            profile.ClickSupportPin();
            profile.ClickNews();

            home.UserMenuLogOut();
            Assert.IsTrue(home.CheckLogOut());
            authorize.EnterEmail(configFiles.getAppValue("userLogin"));
            authorize.EnterPassword(configFiles.getAppValue("userPassword"));
            authorize.ClickButonLogin();
            home.UserMenuGoToProfile();

            Assert.AreEqual(profile.GetName(), name + " " + lastName);
            Assert.AreEqual(profile.GetEmail(), email);
            Assert.IsNotNull(profile.GetPassword());
            Assert.AreEqual(profile.GetPhone(), code + " " + number);
            Assert.AreEqual(profile.GetAddress(), street + ", " + city + ", " + state + " " + zipCode + ", " + country);
            Assert.AreNotEqual(oldPin, profile.GetSupportPin());
            Assert.AreNotEqual(newsState, profile.GetkNewsState());

            checkScreenshot = false;
        }

        [TestMethod]
        public void Test7()// My profile page. Refresh support pin
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.UserMenuGoToProfile();
            string oldPin = profile.GetSupportPin();
            profile.ClickSupportPin();
            string newPin = profile.GetSupportPin();
            Assert.AreNotEqual(oldPin, newPin);

            checkScreenshot = false;
        }

        private void LogOut()
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.UserMenuLogOut();
            Assert.IsTrue(home.CheckLogOut());

            checkScreenshot = false;
        }

        [TestCleanup]
        public void Clean()
        {
            LogOut();

            if (checkScreenshot)
                customMethods.logError(driver, methodName);
        }

        [ClassCleanup]
        public static void CleanUp()
        {
            driver.Quit();
        }
    }
}
