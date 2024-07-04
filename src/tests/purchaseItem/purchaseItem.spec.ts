import "dotenv/config";
import { test } from "../base.fixture";
import { expect } from "@playwright/test";

test.describe("Purchase Flow for Standard User", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login({
      email: process.env.USER_EMAIL!,
      password: process.env.USER_PASSWORD!,
    });
  });

  test(
    "Successful Purchase",
    { tag: ["@regression"] },
    async ({ paymentConfirmationPage, productsPage, checkoutPage, isSlow }) => {
      test.slow(isSlow, "A lot of workers");

      await productsPage.selectProductByName("Backpack");
      // Validate the header component are presnet
      expect(await productsPage.getProductName.textContent()).toContain(
        "Backpack",
      );
      await productsPage.addToCart();
      //validate that remove button is present
      await productsPage.removeBtn.waitFor({ state: "visible" });

      //validate that back toproducts button is present
      await productsPage.backToProductsBtn.waitFor({ state: "visible" });
      await productsPage.selectProductByName("Backpack");
      //validate that shoppping cart badge is updated
      expect(await productsPage.shoppingCartBadge.textContent()).toStrictEqual(
        "1",
      );

      //Verify that the cart page is displayed and it contains the selected product.
      await productsPage.goToShoppingCart();
      await productsPage.page.waitForURL(`/cart.html`);

      await productsPage.validateShoppingCartPage();
      await productsPage.goToCheckoutPage();
      await productsPage.page.waitForURL(`/checkout-step-one.html`);

      await checkoutPage.addCheckoutUserDetails({
        firstName: process.env.FIRST_NAME!,
        lastName: process.env.LAST_NAME!,
        zipCode: process.env.ZIP_CODE!,
      });

      await checkoutPage.continueWithCheckout();
      await productsPage.page.waitForURL(`/checkout-step-two.html`);

      //Validate purchase details and payment informations
      await expect.soft(productsPage.getProductName).toBeVisible();
      let price = parseFloat(
        (await paymentConfirmationPage.productPriceValue.innerText()).split(
          "$",
        )[1],
      );
      expect
        .soft(await productsPage.getProductPrice())
        .toEqual(await paymentConfirmationPage.productPriceValue.innerText());

      expect
        .soft(await productsPage.productQuantityValue.textContent())
        .toStrictEqual("1");

      await expect.soft(paymentConfirmationPage.paymentLabel).toBeVisible();
      const totalPrice = parseFloat(
        (await paymentConfirmationPage.getTotalPrice()).split("$")[1],
      );
      expect(totalPrice).toBeGreaterThanOrEqual(price);

      await checkoutPage.finishBtn.click();
      await checkoutPage.page.waitForURL(`/checkout-complete.html`);
      //Validate Order Confirmation page
      await expect.soft(checkoutPage.backToHomeBtn).toBeVisible();
      expect
        .soft(await checkoutPage.orderConfimrationText.textContent())
        .toContain("Thank you for your order!");
    },
  );

  test("Filter products by price", async ({ productsPage }) => {
    // Ensure the inventory page is loaded
    await expect(productsPage.page).toHaveURL(
      "https://www.saucedemo.com/inventory.html",
    );

    // Select 'Price (low to high)' from the filter dropdown
    await productsPage.sortBtn.selectOption({ value: "lohi" });

    // Verify the products are sorted by price (low to high)
    const prices = await productsPage.productPriceValue.evaluateAll((items) =>
      items.map((item) => parseFloat(item.textContent!.replace("$", ""))),
    );

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });
});
