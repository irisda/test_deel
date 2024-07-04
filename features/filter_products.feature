Feature: Filter Products on SauceDemo

  Scenario: Filter products from low to high price
    Given I am on the SauceDemo products page
    When I filter the products by price from low to high
    Then the products should be sorted by price from low to high
