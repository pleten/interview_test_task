using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using testMethods;

namespace ssls.Tests
{
    [TestClass]
    public class HomePageFilters:BaseTest
    {
        private static List<string> packagesName;
        private static List<Package> packages;

        [ClassInitialize]
        public static void initialize(TestContext t)
        {
            packagesName = new List<string>(new string[] { "EV SSL", "EV Multi-Domain SSL", "PositiveSSL", "PositiveSSL Multi-Domain",
                "PositiveSSL Wildcard", "EssentialSSL", "InstantSSL", "EssentialSSL Wildcard", "InstantSSL Pro", "PremiumSSL",
                "Unified Communications", "PremiumSSL Wildcard", "Multi-Domain SSL" });
        }

        [TestMethod]
        public void Test8p1()//Verify list of SSL certificates after clicking on “Personal” filter;
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.GoToPage();
            List<string> personal = new List<string>(new string[] { packagesName[2], packagesName[3], packagesName[4] });
            home.ClickFilterPersonal();
            Assert.IsTrue(home.ComparePackages(personal));

            checkScreenshot = false;
        }

        [TestMethod]
        public void Test8p2()//Verify list of SSL certificates after clicking on “Personal” + “Multi-Domain” filter;
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.GoToPage();
            List<string> personalAndMultiDomain = new List<string>(new string[] { packagesName[3] });
            home.ClickFilterPersonal();
            home.ClickFilterMultiDomain();
            Assert.IsTrue(home.ComparePackages(personalAndMultiDomain));

            checkScreenshot = false;
        }

        [TestMethod]
        public void Test8p3()//Verify that SSL certificates sorted by "Featured" by default;
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.GoToPage();
            packages = new List<Package>();
            packages.AddRange(home.GetList());
            Assert.IsTrue(home.IsByFutured(packages));

            checkScreenshot = false;
        }


        [TestMethod]
        public void Test8p4()//Verify that SSL certificates sorted by "Cheapest" after clicked "Cheapest" button;
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.GoToPage();
            home.ClickFilterCheapest();
            packages = new List<Package>();
            packages.AddRange(home.GetList());
            Assert.IsTrue(home.IsByCheapest(packages));

            checkScreenshot = false;
        }

        [TestMethod]
        public void Test8p5()//Verify that SSL certificates sorted by "Featured" after clicked "Featured" button.
        {
            methodName = System.Reflection.MethodBase.GetCurrentMethod().Name;

            home.GoToPage();
            home.ClickFilterCheapest();
            home.ClickFilterFutured();
            packages = new List<Package>();
            packages.AddRange(home.GetList());
            Assert.IsTrue(home.IsByFutured(packages));

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
    public class Package
    {
        public string Name { get; set; }

        public double Stars { get; set; }

        public double Price { get; set; }
    }
}
