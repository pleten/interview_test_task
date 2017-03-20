using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

using System.Threading;
using ssls.Settings;
using testMethods;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Interactions;

namespace ssls.Pages
{
    public class Profile:BasePage
    {
        private IWebDriver driver;

        public Profile()
        {
            this.driver = Singleton.getInstance.driver;
            PageFactory.InitElements(this.driver, this);
        }

        public override void GoToPage()
        {
            driver.Navigate().GoToUrl(configFiles.getAppValue("baseUrl")+ "/user/profile");
        }

        [FindsBy(How = How.XPath, Using = "//span[contains(.,'Name')]")]
        IWebElement TitleName { get; set; }
        [FindsBy(How = How.Name, Using = "supportPin")]
        IWebElement BtnSupportPin { get; set; }
        public void ClickSupportPin()
        {
            Enable(BtnSupportPin);
            BtnSupportPin.Click();
            Enable(TitleName);
        }

        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Support pin']/../../div[2]/span")]
        IWebElement SupportPin { get; set; }
        public string GetSupportPin()
        {
            return SupportPin.Text;
        }

        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Name']/../../button")]
        IWebElement EditNamePin { get; set; }

        [FindsBy(How = How.Name, Using = "name")]
        IWebElement Name { get; set; }

        [FindsBy(How = How.Name, Using = "lastName")]
        IWebElement LastName { get; set; }

        [FindsBy(How = How.CssSelector, Using = ".btn.btn-s.round.info")]
        IWebElement SaveName { get; set; }
        
        public void EnterName(string name, string surName)
        {
            Enable(EditNamePin);
            EditNamePin.Click();
            Name.Clear();
            Name.SendKeys(name);
            LastName.Clear();
            LastName.SendKeys(surName);
            SaveName.Click();
        }

        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Email']/../../button")]
        IWebElement EditEmailPin { get; set; }

        [FindsBy(How = How.Name, Using = "email")]
        IWebElement NewEmail { get; set; }

        [FindsBy(How = How.Name, Using = "email_confirm_password")]
        IWebElement Password { get; set; }

        [FindsBy(How = How.XPath, Using = ".//*[@id='ng-app']/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[2]/div[2]/div/div[3]/button[2]")]
        IWebElement SaveEmail { get; set; }
        
        public void EnterEmail(string email)
        {
            Enable(EditEmailPin);
            EditEmailPin.Click();
            NewEmail.Clear();
            NewEmail.SendKeys(email);
            Password.Clear();
            Password.SendKeys(configFiles.getAppValue("userPassword"));
            SaveEmail.Click();
            configFiles.setAppValue("userLogin", email);
            int emailNum = int.Parse(configFiles.getAppValue("emailNum"));
            configFiles.setAppValue("emailNum", (++emailNum).ToString());
        }


        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Phone']/../../button")]
        IWebElement EditPhonePin { get; set; }

        [FindsBy(How = How.Name, Using = "phoneCode")]
        IWebElement CountryCode { get; set; }

        [FindsBy(How = How.Name, Using = "phone")]
        IWebElement PhoneNumber { get; set; }

        [FindsBy(How = How.XPath, Using = ".//*[@id='ng-app']/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[4]/div[2]/div/div[2]/button[2]")]
        IWebElement SavePhone { get; set; }

        public void EnterPhone(string code, string number)
        {
            Enable(EditPhonePin);
            EditPhonePin.Click();
            SelectElement country = new SelectElement(CountryCode);
            country.SelectByText(code);
            PhoneNumber.Clear();
            PhoneNumber.SendKeys(number);
            SavePhone.Click();
        }


        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Address']/../../button")]
        IWebElement EditAddressPin { get; set; }

        [FindsBy(How = How.XPath, Using = "//input[@ng-model='user.address.street']")]
        IWebElement Street { get; set; }

        [FindsBy(How = How.XPath, Using = "//input[@ng-model='user.address.city']")]
        IWebElement City { get; set; }


        [FindsBy(How = How.XPath, Using = "//input[@ng-model='user.address.state']")]
        IWebElement State { get; set; }
        
        [FindsBy(How = How.Name, Using = "zip")]
        IWebElement ZipCode { get; set; }

        [FindsBy(How = How.Name, Using = "countries")]
        IWebElement Country { get; set; }


        [FindsBy(How = How.XPath, Using = ".//*[@id='ng-app']/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[5]/div[2]/div/div[5]/button[2]")]
        IWebElement SaveAddress { get; set; }

        public void EnterAddress(string street, string city, string state, string zipCode, string country)
        {
            Enable(EditAddressPin);
            EditAddressPin.Click();
            Street.Clear();
            Street.SendKeys(street);
            City.Clear();
            City.SendKeys(city);
            State.Clear();
            State.SendKeys(state);
            ZipCode.Clear();
            ZipCode.SendKeys(zipCode);
            //Country.Clear();
            //Country.SendKeys(country);
            SaveAddress.Click();
        }
        
        [FindsBy(How = How.XPath, Using = ".//*[@id='ng-app']/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[7]/div[2]/button")]
        IWebElement NewsTogle { get; set; }

        public void ClickNews()
        {
            Enable(NewsTogle);
            NewsTogle.Click();
        }

        ///////////////////////////////////////////////////////////
        [FindsBy(How = How.XPath, Using = "//button[@class='toggle-btn on']")]
        IWebElement NewsOn { get; set; }
        public bool GetkNewsState()
        {
            try
            {
                return Enable(NewsOn);
            }
            catch (System.Exception)
            {
                return false;
            }
            
        }

        
        ///////////////////////////////////////////////////////////

        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Name']/../../div[2]/span")]
        IWebElement NameText { get; set; }
        public string GetName()
        {
            return NameText.Text;
        }

        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Email']/../../div[2]/span")]
        IWebElement EmailText { get; set; }
        public string GetEmail()
        {
            return EmailText.Text;
        }

        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Password']/../../div[2]/span")]
        IWebElement PasswordText { get; set; }
        public string GetPassword()
        {
            return PasswordText.Text;
        }


        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Phone']/../../div[2]/span")]
        IWebElement PhoneText { get; set; }
        public string GetPhone()
        {
            return PhoneText.Text;
        }

        [FindsBy(How = How.XPath, Using = "//span[@class='text' and text()='Address']/../../div[2]/span")]
        IWebElement AddressText { get; set; }
        public string GetAddress()
        {
            return AddressText.Text;
        }

    }
}
