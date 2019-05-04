package Data.User;

public enum RegistrationData {
    VALID("test+" + Math.random() * 5, "test+" + Math.random() * 5, "stanislav.leontjev+" + Math.random() * 5 + "@bigdropinc.com", "123456789", "123456789"),
    INVALID("test+" + Math.random() * 5, "test+" + Math.random() * 5, "stanislav.leontjev+" + Math.random() * 5 + "@bigdropinc", "123456", "123456789");


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;


    RegistrationData(String firstName, String lastName, String email, String password, String confirmPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

}
