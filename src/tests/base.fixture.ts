import { Page } from "@playwright/test";
import * as OS from "node:os";

import { test as baseTest } from "@playwright/test";

import { salaryPage } from "../pages/salary/salary.page";

export type BaseSalaryFixture = {
  dsPage: Page;
  salaryPage: salaryPage;
  isSlow: boolean;
};

export const test = baseTest.extend<BaseSalaryFixture>({
  dsPage: async ({ browser }, use: (r: Page) => Promise<void>) => {
    const context = await browser.newContext({
      baseURL: process.env.APP_BASEURL,
    });
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  salaryPage: async ({ dsPage }, use: (r: salaryPage) => Promise<void>) => {
    const page = new salaryPage(dsPage);
    await use(page);
    await page.close();
  },
  isSlow: [
    async ({}, use: (r: boolean) => Promise<void>, testInfo): Promise<void> => {
      await use(testInfo.config.workers / OS.cpus().length >= 0.05);
    },
    { scope: "test" },
  ],
});
