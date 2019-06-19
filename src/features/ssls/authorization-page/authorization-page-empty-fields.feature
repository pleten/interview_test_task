@regression @authorization-page @empty-fields @task-3
Feature: TASK-3: As a SSLS user I can't login to the application with wrong login and password

  Scenario: TASK-3: Authorization page. Empty fields: show password
    Given the Home page has been opened
    When the user clicks on the "LOG IN" text
    And the user enters e-mail EMPTY
    And the user enters password EMPTY
    And the user clicks "Login" button
    Then the error message for empty email field appears with text
    """
    Oops, please enter your email
    """
    And the error message for password field appears with text
    """
    Looks like you’ve missed this one
    """
