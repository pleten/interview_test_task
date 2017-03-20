using System;
using System.IO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using testMethods;

namespace ssls.Settings
{
    [TestClass]
    public class Settings
    {
        [TestMethod]
        public void createErrorDirectory()
        {
            configFiles.setConfiguration(@"C:\test\settings\configuration\ssls\main.config");

            String path = configFiles.getAppValue("saveDirectory") + "\\" + DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss");
            Directory.CreateDirectory(path);
            var myLog = File.Create(path + "\\error.log");
            myLog.Close();
            foreach (String item in Directory.GetFileSystemEntries(configFiles.getAppValue("configFiles"), "*.config", SearchOption.AllDirectories))
            {
                configFiles.setConfiguration(item);
                configFiles.setAppValue("errorDirectory", path + "\\");
                configFiles.setAppValue("errorLog", path + @"\error.log");
            }
        }
    }
}