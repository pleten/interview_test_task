using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Ssl_web_tests
{
    public class PersonalProfileService:BaseService
    {
        public Dictionary<string, string> locators = new Dictionary<string, string>();

        public PersonalProfileService(ApplicationManager manager) : base(manager)
        {
            locators.Add("supportPinUpdatingButton", "button[name='supportPin']");
        }

        public string GetCurrentPin()
        {            
            return Driver.FindElement(By.CssSelector("div[ng-class=\"{disabled: activeRow !== 'pin' && activeRow !== 'all'}\"]"))
                .FindElement(By.CssSelector("span.ng-binding")).Text;    
        }

        public void InitSupportPinChanging()
        {
            Driver.FindElement(By.CssSelector(locators["supportPinUpdatingButton"])).Click();
            WaitUntilPageIsLoaded(3);
        }
    }
}
