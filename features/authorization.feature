Feature: Authorization page

    As an registered user I should be able to login to the application.

    Scenario: Registered user should login with correct credentials
        Given I am on Login page
        When I fill in valid credentials
        And I initiate login
        Then I should be logged in to the system

    Scenario Outline: Password should be displayed after pressing "eye" button
        Given I am on Login page
        When I fill in <password> into Password field
        And I press Eye icon
        Then Filled <password> password should be displayed in the field

        Examples:
            | password  |
            | test_pass |

    Scenario Outline: Validation error message should be displayed during login with unregistered creds
        Given I am on Login page
        When I fill in <email> and <password> fields
        And I initiate login
        Then <message> notification message should be displayed

        Examples:
            | email           | password  | message                               |
            | test12@test.com | test_pass | Uh oh! Email or password is incorrect |

    Scenario Outline: Validation error message should be displayed in case of login with invalid email
        Given I am on Login page
        When I fill in <email> and <password> fields
        Then <message> validation message for Email filed should be displayed

        Examples:
            | email          | password  | message                    |
            | test@@test.com | test_pass | Uh oh! This isn’t an email |
            | @test.com      | test_pass | Uh oh! This isn’t an email |
            | 1test@         | test_pass | Uh oh! This isn’t an email |
            | test@testcom   | test_pass | Uh oh! This isn’t an email |

    Scenario Outline: Validation error should occur if email field is empty
        Given I am on Login page
        When I fill in <password> into Password field
        And I initiate login
        Then <message> validation message for Email filed should be displayed

        Examples:
            | password  | message                       |
            | test_pass | Oops, please enter your email |

    Scenario Outline: Validation error should occur if password field is empty
        Given I am on Login page
        When I fill in <email> into Email field
        And I initiate login
        Then <message> validation message for Password field should be displayed

        Examples:
            | email         | message                           |
            | test@test.com | Looks like you’ve missed this one |