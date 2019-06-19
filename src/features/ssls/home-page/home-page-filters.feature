@regression @home-page @filters @task-8
Feature: TASK-8: As a SSLS user I can filter list of SSL certificates

  @home-page-personal-filter
  Scenario: TASK 8.1: List of SSL certificates filtered by "Personal" contains only product cards with "Domain Validation"
    Given the Home page has been opened
    When the user clicks on filter buttons
      | Personal |
    Then list of SSL certificates contains only product cards with domain validation

  @home-page-business-one-domain-filter
  Scenario: TASK 8.2: List of SSL certificates filtered by "Business" and "One domain" contains only product cards with "Organization Validation" and "1 domain"
    Given the Home page has been opened
    When the user clicks on filter buttons
      | Business | One domain |
    Then list of SSL certificates contains only product cards with Organization Validation and 1 domain

  @home-page-cheapest-filter
  Scenario: TASK 8.3: List of SSL certificates filtered by "Cheapest/Featured" contains product cards sorted by price ascending
    Given the Home page has been opened
    When the user clicks "Cheapest" filter button
    And the user clicks on "Featured" filter button to sort products by price
    And the user clicks "Cheapest" filter button
    Then list of SSL certificates contains product cards sorted by price ascending