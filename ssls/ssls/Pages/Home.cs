using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
using testMethods;
using ssls.Settings;
using System.Collections.Generic;
using ssls.Tests;
using System;

namespace ssls.Pages
{
    public class Home: BasePage
    {
        private IWebDriver driver;

        public Home()
        {
            this.driver = Singleton.getInstance.driver;
            PageFactory.InitElements(this.driver, this);
        }

        public override string GetURL()
        {
            Enable(BtnLogin);
            return base.GetURL();
        }

        public override void GoToPage()
        {
            driver.Navigate().GoToUrl(configFiles.getAppValue("baseUrl"));
        }

        [FindsBy(How = How.CssSelector, Using = ".btn.flat-dark.ng-scope")]
        IWebElement BtnLogin { get; set; }
        public void ClickButonLogin()
        {
            BtnLogin.Click();
        }

        public bool CheckLogOut()
        {
            return Enable(BtnLogin);
        }

        [FindsBy(How = How.CssSelector, Using = ".btn.btn-s.round.filled.user-btn.ng-binding")]
        IWebElement ProfileLogin { get; set; }
        public string getLogin()
        {
            return ProfileLogin.Text;
        }

        [FindsBy(How = How.CssSelector, Using = ".btn.btn-s.round.filled.dropdown-btn.ng-isolate-scope")]
        IWebElement UserMenu { get; set; }
        [FindsBy(How = How.CssSelector, Using = ".drop-button")]
        IWebElement UserLogOut { get; set; }
        public void UserMenuLogOut()
        {
            Enable(UserMenu);
            UserMenu.Click();
            UserLogOut.Click();
        }

        [FindsBy(How = How.XPath, Using = "//a[@href='/user/profile']")]
        IWebElement UserProfile { get; set; }
        public void UserMenuGoToProfile()
        {
            UserMenu.Click();
            UserProfile.Click();
        }

        [FindsBy(How = How.XPath, Using = "//a[@class='btn block round control' and contains(.,'Personal')]")]
        IWebElement FilterPersonal { get; set; }
        public void ClickFilterPersonal()
        {
            FilterPersonal.Click();
        }

        [FindsBy(How = How.XPath, Using = "//a[@class='btn block round control ng-binding' and contains(.,'multi-domain')]")]
        IWebElement FilterMultiDomain { get; set; }
        public void ClickFilterMultiDomain()
        {
            FilterMultiDomain.Click();
        }

        [FindsBy(How = How.XPath, Using = "//a[@class='btn block round control ng-scope' and contains(.,'Featured')]")]
        IWebElement FilterFutured { get; set; }
        public void ClickFilterFutured()
        {
            FilterFutured.Click();
        }

        [FindsBy(How = How.XPath, Using = "//a[@class='btn block round control ng-scope' and contains(.,'Cheapest')]")]
        IWebElement FilterCheapest { get; set; }
        public void ClickFilterCheapest()
        {
            FilterCheapest.Click();
        }

        public bool SortByFeatured()
        {
            return Enable(FilterCheapest);
        }

        public bool SortByCheapest()
        {
            return Enable(FilterFutured);
        }

        [FindsBy(How = How.XPath, Using = "//h3[@class='ssl-name ng-binding']")]
        IList<IWebElement> SslPackeges { get; set; }

        public bool ComparePackages(List<string> packeges)
        {
            for (int i = 0; i < SslPackeges.Count; i++)
            {
                string s1 = SslPackeges[i].Text;
                string s2 = packeges[i];
                if (SslPackeges[i].Text != packeges[i])
                    return false;
            }
            return true;
        }


        [FindsBy(How = How.XPath, Using = "//div[@class='ssl-content']/div[1]/price[1]/span/span[2]")]
        IList<IWebElement> PricePart1 { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[@class='ssl-content']/div[1]/price[1]/span/span[3]")]
        IList<IWebElement> PricePart2 { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[contains(@class,'rating')]")]
        IList<IWebElement> Stars { get; set; }

        public List<Package> GetList()
        {
            List<Package> packages = new List<Package>();
            
            for (int i = 0; i < SslPackeges.Count; i++)
            {
                Package pac = new Package();
                pac.Name = SslPackeges[i].Text;
                pac.Price = double.Parse(PricePart1[i].Text + PricePart2[i].Text);//regional setings .,
                string original = Stars[i].GetAttribute("class");
                string part1 = original.Substring(original.IndexOf('-') + 1, 1);
                string part2 = original.Substring(original.IndexOf('_') + 1, 1);
                pac.Stars = double.Parse(part1 + "." + part2);
                packages.Add(pac);
            }
            return packages;
        }

        public bool IsByFutured(List<Package> list)
        {
            double previous = 0;
            for (int i = 0; i < list.Count; i++)
            {
                if (i == 0)
                    previous = list[i].Stars;
                else
                {
                    if (previous < list[i].Stars)
                        return false;
                    previous = list[i].Stars;
                }
            }
            return true;
        }

        public bool IsByCheapest(List<Package> list)
        {
            double previous = 0;
            for (int i = 0; i < list.Count; i++)
            {
                if (i == 0)
                    previous = list[i].Price;
                else
                {
                    if (previous > list[i].Price)
                        return false;
                    previous = list[i].Price;
                }
            }
            return true;
        }
    }
}
