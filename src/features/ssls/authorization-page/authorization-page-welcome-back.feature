@regression @authorization-page @welcome-back @task-1
Feature: TASK-1: As a SSLS user I can login to the application with given login and password

  Scenario: TASK-1: Authorization page (Welcome back!): open Authorization page
    Given the Home page has been opened
    When the user clicks on the "LOG IN" text
    Then the Authorization page is opened

  Scenario: TASK-1: Authorization page (Welcome back!): show password
    Given the Authorization page has been opened
    When the user enters e-mail ssls.automation+5@gmail.com
    And the user enters password 123456
    And the user clicks on "eye" icon for password field
    Then the password string 123456 appears in the password field

  Scenario: TASK-1: Authorization page (Welcome back!): login to application
    Given the Authorization page has been opened
    When the user enters email ssls.automation+5@gmail.com and password 123456
    And the user clicks "Login" button
    Then The button "Log in" changes on "User@email" button from the left side in the Header of the page