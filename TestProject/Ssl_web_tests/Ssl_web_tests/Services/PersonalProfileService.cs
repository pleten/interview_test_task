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
            locators.Add("OpenNameFieldToEdit", "button[ng-click=\"activeRow = 'name'\"]");
            locators.Add("NameField", "input[name='name']");
            locators.Add("LastNameField", "input[name='lastName']");
            locators.Add("OpenEmailFieldToEdit", "button[ng-click=\"activeRow = 'email'\"]");
            locators.Add("EmailField", "input[name='email']");
            locators.Add("OpenPhoneFieldToEdit", "button[ng-click=\"activeRow = 'phone'\"]");
            locators.Add("PhoneCodesDropdown", "span.select");
            locators.Add("PhoneNumberField", "input[ng-model='user.phone.number']");
            locators.Add("OpenAddressFieldToEdit", "button[ng-click=\"activeRow = 'address'\"]");
            locators.Add("StreetField", "input[ng-model='user.address.street']");
            locators.Add("CityField", "input[ng-model='user.address.city']");
            locators.Add("StateField", "input[ng-model='user.address.state']");
            locators.Add("ZipField", "input[ng-model='user.address.zip']");
            locators.Add("CountryField", "input[ng-model='countryTyped']");
            locators.Add("supportPinUpdatingButton", "button[name='supportPin']");
            locators.Add("cancelButton", "button[ng-click='reset()']");

        }

        internal PersonalData GetPersonalDataListFromViewMode()
        {
            PersonalData userInfo = new PersonalData();
            IList<IWebElement> fieldsDescription = Driver.FindElements(By.CssSelector("div.description"));
            userInfo.FullName = fieldsDescription[0].FindElement(By.CssSelector("span[ng-hide=\"activeRow === 'name'\"]")).Text.Trim();
            userInfo.Email = fieldsDescription[1].FindElement(By.CssSelector("span[ng-hide=\"activeRow === 'email'\"]")).Text.Trim();
            userInfo.Password = fieldsDescription[2].FindElement(By.CssSelector("span[ng-hide=\"activeRow === 'password'\"]")).Text.Trim();
            userInfo.FullPhoneNumber = fieldsDescription[3].FindElement(By.CssSelector("span[ng-hide=\"activeRow === 'phone'\"]")).Text.Trim();
            userInfo.FullAddress = fieldsDescription[4].FindElement(By.CssSelector("span[ng-hide=\"activeRow === 'address'\"]")).Text.Trim();
            userInfo.SupportPin = fieldsDescription[5].FindElement(By.CssSelector("span.text.ng-binding")).Text.Trim();

            return userInfo;
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

        public PersonalData GetPersonalDataListFromEditMode()
        {
            PersonalData userInfo = new PersonalData();

            //User name 
            Driver.FindElement(By.CssSelector(locators["OpenNameFieldToEdit"])).Click();
            userInfo.FirstName = Driver.FindElement(By.CssSelector(locators["NameField"])).Text;
            userInfo.LastName = Driver.FindElement(By.CssSelector(locators["LastNameField"])).Text;
            userInfo.FullName = userInfo.GetFullName();
            Driver.FindElement(By.CssSelector(locators["cancelButton"])).Click();

            //User email
            Driver.FindElement(By.CssSelector(locators["OpenEmailFieldToEdit"])).Click();
            userInfo.Email = Driver.FindElement(By.CssSelector(locators["EmailField"])).Text;
            Driver.FindElement(By.CssSelector(locators["cancelButton"])).Click();

            //Phone number
            Driver.FindElement(By.CssSelector(locators["OpenPhoneFieldToEdit"])).Click();
            userInfo.PhoneCode = Driver.FindElement(By.CssSelector(locators["PhoneCodesDropdown"])).Text;
            userInfo.Phone = Driver.FindElement(By.CssSelector(locators["PhoneNumberField"])).GetAttribute("value");
            userInfo.FullPhoneNumber = userInfo.GetFullPhoneNumber();
            Driver.FindElement(By.CssSelector(locators["cancelButton"])).Click();

            //Address
            Driver.FindElement(By.CssSelector(locators["OpenAddressFieldToEdit"])).Click();
            userInfo.Street = Driver.FindElement(By.CssSelector(locators["StreetField"])).GetAttribute("value");
            userInfo.City = Driver.FindElement(By.CssSelector(locators["CityField"])).GetAttribute("value");
            userInfo.State = Driver.FindElement(By.CssSelector(locators["StateField"])).GetAttribute("value");
            userInfo.Index = Driver.FindElement(By.CssSelector(locators["ZipField"])).GetAttribute("value");
            userInfo.Country = Driver.FindElement(By.CssSelector(locators["CountryField"])).GetAttribute("value");
            userInfo.FullAddress = userInfo.GetFullAddress();
            Driver.FindElement(By.CssSelector(locators["cancelButton"])).Click();

            //SupportPin
            userInfo.SupportPin = GetCurrentPin();

            return userInfo;

        }
    }
}
