using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ssl_web_tests
{
    public class TestResult
    {

        private IWebDriver driver;
        private StringBuilder verificationErrors;
        private string baseURL;
        private bool acceptNextAlert = true;

        [TestFixtureSetUp]
        public void SetupTest()
        {
            FirefoxDriverService service = FirefoxDriverService.CreateDefaultService(@"C:\geckodriver", "geckodriver.exe");
            service.Port = 64444;
            service.FirefoxBinaryPath = @"C:\Program Files (x86)\Firefox Developer Edition\firefox.exe";
            driver = new FirefoxDriver(service);
            baseURL = "http://localhost:49539";
            verificationErrors = new StringBuilder();
        }
    }
}
