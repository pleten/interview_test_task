package Management;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by valeriy on 4/1/2017.
 */
//Extract the credentials from the properties file
public class Info {
    private InputStream input;
    private Properties prop;
    private String propFileName = "data.properties";
    public enum Creds {Password,Login,Url};

    public String getData(Creds cred) {
        String dataPiece = null;
        String property = null;
        switch(cred){
            case Login:
                property = "login";
                break;
            case Password:
                property = "password";
                break;
            case Url:
                property = "url";
                break;
        }
        try {
            prop = new Properties();
            input = getClass().getClassLoader().getResourceAsStream(propFileName);
            prop.load(input);
            dataPiece = prop.getProperty(property);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return dataPiece;
    }
}
