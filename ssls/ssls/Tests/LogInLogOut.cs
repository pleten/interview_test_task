using Microsoft.VisualStudio.TestTools.UnitTesting;
using testMethods;

namespace ssls.Tests
{
    [TestClass]
    public class LogInLogOut:BaseTest
    {
        [TestInitialize]
        public void Setup()
        {
            checkScreenshot = true;
        }

        [TestMethod]
        public void Test1()//Authorization page (Welcome back!)
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
            authorize.GoToPage();
            authorize.EnterEmail(configFiles.getAppValue("userLogin"));
            authorize.EnterPassword(configFiles.getAppValue("userPassword"));
            authorize.ClickButonLogin();
            Assert.AreEqual(home.getLogin(), configFiles.getAppValue("userLogin"));

            checkScreenshot = false;
        }

        [TestMethod]
        public void Test5()//Log Out
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            Assert.AreEqual(home.getLogin(), configFiles.getAppValue("userLogin"));
            home.UserMenuLogOut();
            Assert.AreEqual(authorize.GetURL(), configFiles.getAppValue("baseUrl") + "/authorize");

            checkScreenshot = false;
        }

        [ClassCleanup]
        public static void CleanUp()
        {
            driver.Quit();
        }
    }
}
