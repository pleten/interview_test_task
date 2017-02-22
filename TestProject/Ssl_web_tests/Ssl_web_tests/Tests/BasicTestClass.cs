using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;

namespace Ssl_web_tests
{
    public class BasicTestClass
    {
        protected ApplicationManager pageService;

        [SetUp]
        public void SetupApplicationManager()
        {
            pageService = ApplicationManager.GetInstance();
        }
    }
}
