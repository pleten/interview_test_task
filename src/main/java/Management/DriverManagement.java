package Management;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.AfterClass;

import java.util.concurrent.TimeUnit;

/**
 * Created by valeriy on 4/1/2017.
 */
public class DriverManagement {
    protected static WebDriver driver;
    protected static String password;
    protected static String login;
    protected static String url;

    @BeforeClass
    public static void setUp() {
        Info info = new Info();
        System.setProperty("webdriver.gecko.driver", "D:\\Driver\\geckodriver.exe");
        driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        url = info.getData(Info.Creds.Url);
        login = info.getData(Info.Creds.Login);
        password = info.getData(Info.Creds.Password);
    }

    @AfterTest
    public void cleanUp() {
        driver.manage().deleteAllCookies();
    }

    @AfterClass
    public static void tearDown() {
        driver.close();
    }
}
