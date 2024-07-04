import "dotenv/config";
import { expect } from "@playwright/test";
import { test } from "../base.fixture";

test.describe("User Login Flow", () => {
  //This test covers the user login with correct username and password
  test(
    "User login: Succesfully",
    { tag: ["@regression, @login"] },
    async ({ loginPage, isSlow }) => {
      test.slow(isSlow, "A lot of workers");
      await loginPage.goto();
      await loginPage.login({
        email: process.env.USER_EMAIL!,
        password: process.env.USER_PASSWORD!,
      });
      await loginPage.page.waitForURL(`/inventory.html`);

      // Validate the header component are presnet
      expect(await loginPage.shoppingCartBtn.isVisible()).toBe(true);
      expect(await loginPage.burgerMenu.isVisible()).toBe(true);
    },
  );
});
