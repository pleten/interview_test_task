@regression @log-out @task-5
Feature: TASK-5: As a SSLS user I can log out the application

  Scenario: TASK-5: Log out
    Given the user has been logged in
    When the user clicks on triangle near the "User@email" button
    And the user selects the drop-down menu item "Log out"
    Then the user is logged out
    And the user is redirected on authorization page https://www.ssls.com/authorize
