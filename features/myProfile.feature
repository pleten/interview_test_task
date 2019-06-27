Feature: My Profile feature

    As a Registered User I see my personal information on My Profile page.

    Scenario: User profile page should contain
        Given I login as registered user
        When I open My profile page from the dropdown menu
        Then User name, Email and Support pin on Profile form should match corresponding values on the dropdown menu
        And Password, Phone and Address fields should not be empty

    Scenario: It sould be possible to refresh Support pin
        Given I login as registered user
        When I open My profile page from the dropdown menu
        And I refresh Support pin on Profile form
        Then Support pin should be updated on Profile form and on dropdown menu


