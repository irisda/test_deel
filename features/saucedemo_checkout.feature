Feature: Checkout Product on SauceDemo

  Scenario: Add a product to the cart and complete the checkout process
    Given I am on the SauceDemo products page
    When I add the first product to the cart
    And I click the shopping cart icon
    Then I should see the first product in the cart
    When I proceed to the checkout page
    And I enter checkout information with "John" "Doe" "1001 AL"
    And I click the continue button
    And I click the finish button
    Then I should see the order confirmation message
