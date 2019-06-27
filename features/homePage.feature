Feature: Home page

    As a registered user I can see available certificates on Home page.

    Scenario Outline: Only certificates with "Domain validation" characteristic should be displayed on Home Page after "Personal" filter selection
        Given I login as registered user
        When I select Personal filter on Home page
        Then Only certificates with <attribute> characteristic should be displayed on Home page

        Examples:
            | attribute         |
            | Domain validation |

    Scenario Outline: Only certificates with "Organization validation" characteristic should be displayed on Home Page after "Business" filter selection
        Given I login as registered user
        When I select Business filter on Home page
        Then Only certificates with <attribute> characteristic should be displayed on Home page

        Examples:
            | attribute               |
            | Organization validation |

    Scenario Outline: Only certificates with "1 domain" characteristic should be displayed on Home Page after "One Domain" filter selection
        Given I login as registered user
        When I select One Domain filter on Home page
        Then Only certificates with <attribute> characteristic should be displayed on Home page

        Examples:
            | attribute |
            | 1 domain  |

    Scenario Outline: All certificated should be sorted by price in ASC order after "Cheapest" filter selection
        Given I login as registered user
        When I select Cheapest filter on Home page
        Then Filter title should be changed to <buttonTitle> value
        And All certificated should be sorted by price in ASC order

        Examples:
            | buttonTitle |
            | Featured    |