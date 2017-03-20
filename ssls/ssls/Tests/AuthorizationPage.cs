using Microsoft.VisualStudio.TestTools.UnitTesting;
using testMethods;

namespace ssls.Tests
{
    [TestClass]
    public class AuthorizationPage:BaseTest
    {


        [TestInitialize]
        public void Setup()
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
            authorize.GoToPage();
            checkScreenshot = true;
        }
        
        [TestMethod]
        public void Test2()//Authorization page. Not registered user
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
            
            string fakePassword = "1a2b3c";
            authorize.EnterEmail("unregister@user.com");
            authorize.EnterPassword(fakePassword);
            authorize.ClickButonLogin();
            Assert.AreEqual(authorize.GetGetErrorMessage(), "Uh oh! Email or password is incorrect");
            Assert.IsTrue(home.CheckLogOut());

            checkScreenshot = false;
        }

        [TestMethod]
        public void Test3()//Authorization page. Invalid email
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
            
            authorize.EnterEmail("invalid@@test.com");
            authorize.EnterPassword(configFiles.getAppValue("userPassword"));
            authorize.ClickButonLogin();
            Assert.AreEqual(authorize.GetGetTooltipError(0), "Uh oh! This isn’t an email");
            Assert.IsTrue(home.CheckLogOut());

            checkScreenshot = false;
        }
        
        [TestMethod]
        public void Test4()//Authorization page. Empty fields
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;
            
            authorize.ClickButonLogin();
            Assert.AreEqual(authorize.GetGetTooltipError(1), "Oops, please enter your email");
            Assert.AreEqual(authorize.GetGetTooltipError(2), "Looks like you’ve missed this one");
            Assert.IsTrue(home.CheckLogOut());
            
            checkScreenshot = false;
        }

        [TestCleanup]
        public void Clean()
        {
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
