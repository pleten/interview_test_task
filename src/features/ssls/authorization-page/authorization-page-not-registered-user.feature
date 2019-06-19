@regression @authorization-page @not-registered-user @task-2
Feature: TASK-2: As an unregistered SSLS user I can't login to the application with given login and password

  Scenario: TASK-2: Authorization page. Note registered user: show password
    Given the Home page has been opened
    When the user clicks on the "LOG IN" text
    And the user enters e-mail neg-ssls.automation+5@gmail.com
    And the user enters password 123456
    And the user clicks on "eye" icon for password field
    Then the password string 123456 appears in the password field

  Scenario: TASK-2: Authorization page. Not registered user: show error message
    Given the Authorization page has been opened
    When the user enters email neg-ssls.automation+5@gmail.com and password 123456
    And the user clicks "Login" button
    Then the error message with text appears
    """
    Uh oh! Email or password is incorrect
    """
