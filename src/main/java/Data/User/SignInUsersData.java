package Data.User;

public enum SignInUsersData {
    VALID("ssls.automation+5@gmail.com", "123456"),
    INVALID("testwere@gmail.com","98765432qwe1"),
    UNREGISTERED("leonsted9@gmail.com","123456789");

    public String getLoginEmail() {
        return loginEmail;
    }

    public String getLoginPassword() {
        return password;
    }

    private String  loginEmail;
    private String  password;

    SignInUsersData(String loginEmail, String password){
         this.loginEmail = loginEmail;
         this.password = password;
    }


}