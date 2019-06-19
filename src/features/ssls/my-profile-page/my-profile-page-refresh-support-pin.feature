@regression @my-profile-page @refresh-support-pin @task-7
Feature: TASK-7: As a SSLS user I can get my profile data

  Scenario: TASK-7: My profile page. Client area
    Given the Home page has been opened
    When the user logs in to the user's account
    And the user clicks on triangle near the "User@email" button
    And the user selects in drop-down menu "View profile"
    And the user clicks the "Update" button in "support pin field" to re-generate a new support pin
    Then support pin value is updated
