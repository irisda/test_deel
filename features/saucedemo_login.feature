Feature: Login to SauceDemo

  Scenario: Successful login with valid credentials
    Given I am on the SauceDemo login page
    When I enter valid username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the products page