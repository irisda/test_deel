import { Page } from "@playwright/test";
import * as OS from "node:os";

import { test as baseTest } from "@playwright/test";

import { LoginPage } from "../pages/login/login.page";
import { ProductsPage } from "../pages/products/product.page";
import { CheckoutPage } from "../pages/checkout/checkout.page";
import { PaymentConfirmationPage } from "../pages/payments/paymentConformation.page";

export type BaseDocusketchFixture = {
  dsPage: Page;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  checkoutPage: CheckoutPage;
  paymentConfirmationPage: PaymentConfirmationPage;
  isSlow: boolean;
};

export const test = baseTest.extend<BaseDocusketchFixture>({
  dsPage: async ({ browser }, use: (r: Page) => Promise<void>) => {
    const context = await browser.newContext({
      baseURL: process.env.APP_BASEURL,
    });
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  loginPage: async ({ dsPage }, use: (r: LoginPage) => Promise<void>) => {
    const page = new LoginPage(dsPage);
    await use(page);
    await page.close();
  },
  productsPage: async ({ dsPage }, use: (r: ProductsPage) => Promise<void>) => {
    const page = new ProductsPage(dsPage);
    await use(page);
  },
  checkoutPage: async ({ dsPage }, use: (r: CheckoutPage) => Promise<void>) => {
    const page = new CheckoutPage(dsPage);
    await use(page);
  },
  paymentConfirmationPage: async (
    { dsPage },
    use: (r: PaymentConfirmationPage) => Promise<void>,
  ) => {
    const page = new PaymentConfirmationPage(dsPage);
    await use(page);
  },
  isSlow: [
    async ({}, use: (r: boolean) => Promise<void>, testInfo): Promise<void> => {
      await use(testInfo.config.workers / OS.cpus().length >= 0.1);
    },
    { scope: "test" },
  ],
});
