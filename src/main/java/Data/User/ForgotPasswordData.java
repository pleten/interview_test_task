package Data.User;

public enum ForgotPasswordData {
    VALID("stanislav.leontjev@bigdropinc.com"),
    NOT_EXIST("stanislav1234567.leontjev@bigdropinc.com"),
    NOT_VALID("stanislav@test");

    public String getEmail() {
        return email;
    }

    private String email;

    ForgotPasswordData(String email) {
        this.email = email;
    }
}