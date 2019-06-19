@regression @my-profile-page @client-area @task-6
Feature: TASK-6: As a SSLS user I can get my profile data

  Background:
    Given the Home page has been opened
    When the user logs in to the user's account
    And the user opens "View profile" page
    And the user stores the values of such the fields in Profile
      | Name, Email, Phone, Address, Support Pin, Newsletter |
    And the user logs out

  Scenario: TASK-6: My profile page. Client area
    Given the Home page has been opened
    When the user logs in to the user's account
    And the user clicks on triangle near the "User@email" button
    And the user selects in drop-down menu "View profile"
    Then the opened page "Profile" is displayed
    And the password field is not empty
    And the profile data are equal to the stored ones
