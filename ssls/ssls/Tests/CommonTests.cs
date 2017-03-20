using Microsoft.VisualStudio.TestTools.UnitTesting;
using testMethods;

namespace ssls.Tests
{
    [TestClass]
    public class CommonTests:BaseTest
    {
        [TestInitialize]
        public void Setup()
        {
            checkScreenshot = true;
        }

        [TestMethod]
        public void OpenHomePage()
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.GoToPage();
            Assert.AreEqual(home.GetURL(), configFiles.getAppValue("baseUrl") + "/");

            checkScreenshot = true;
        }

        [TestMethod]
        public void OpenAuthorizePage()
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.GoToPage();
            home.ClickButonLogin();
            authorize.GetURL();
            Assert.AreEqual(authorize.GetURL(), (configFiles.getAppValue("baseUrl") + "/authorize"));

            checkScreenshot = true;
        }

        [TestMethod]
        public void ShowEnteredPassword()
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            string fakePassword = "1a2b3c";
            authorize.GoToPage();
            authorize.EnterPassword(fakePassword);
            Assert.AreEqual(authorize.GetShowPassword(), fakePassword);

            checkScreenshot = true;
        }

        [TestCleanup]
        public void Clean()
        {
            home.GoToPage();
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
