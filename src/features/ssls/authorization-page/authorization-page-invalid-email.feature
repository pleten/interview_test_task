@regression @authorization-page @invalid-email @task-4
Feature: TASK-4: As a SSLS user I can't login to the application with wrong login and password

  Scenario: TASK-4: Authorization page. Invalid email: show password
    Given the Home page has been opened
    When the user clicks on the "LOG IN" text
    And the user enters e-mail wrong_email@gmail.com
    And the user enters password 123456
    And the user clicks on "eye" icon for password field
    Then the password string 123456 appears in the password field

  Scenario: TASK-4: Authorization page. Invalid email: show error message
    Given the Home page has been opened
    When the user clicks on the "LOG IN" text
    And the user enters email wrong_email@gmail.com and password 123456
    And the user clicks "Login" button
    Then the error message with text appears
    """
    Uh oh! Email or password is incorrect
    """

  Scenario: TASK-4: Authorization page. Invalid email: show error message for non-email value
    Given the Home page has been opened
    When the user clicks on the "LOG IN" text
    And the user enters email neg-ssls.automation+5@@gmail.com and password 123456
    And the user clicks "Login" button
    Then the error message for email field appears with text about wrong format
    """
    Uh oh! This isn’t an email
    """
