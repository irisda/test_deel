import "dotenv/config";
import { expect } from "@playwright/test";
import { test } from "../base.fixture";

test.describe("Salary Insights Page - Happy Path", () => {
  const testData = [
    {
      jobTitle: "Accountant",
      country: "Brazil",
      seniority: "Senior Level",
      currency: "BRL",
    },
    {
      jobTitle: "QA Engineer",
      country: "Canada",
      seniority: "Senior Level",
      currency: "CAD",
    },
    {
      jobTitle: "Software Engineer",
      country: "Japan",
      seniority: "Senior Level",
      currency: "JPY",
    },
  ];

  //On this tests we cover the flow:
  //Select the job title and country.
  //Click the button to get insights.
  //Validate the insights displayed on the page.
  testData.forEach(({ jobTitle, country, currency, seniority }) => {
    test(
      `Validate Salary Page for different Job Title: ${jobTitle}, Country: ${country}`,
      { tag: ["@regression, @salary"] },
      async ({ salaryPage, isSlow }) => {
        test.slow(isSlow, "A lot of workers");
        await salaryPage.goto();
        await salaryPage.selectRole({ jobTitle });
        await salaryPage.selectCountry({ country });

        //Validatd if insightsHeader contains selected job and country
       
        const expectedPattern = new RegExp(`${jobTitle}.*${country}`, "i");
        expect
          .soft(await salaryPage.insightsHeader.textContent())
          .toMatch(expectedPattern);

        //Verify selected paramters
        const selectedSeniority = salaryPage.page.locator(
          `h6:has-text("${seniority}")`,
        );
        await selectedSeniority.scrollIntoViewIfNeeded();
        await expect(selectedSeniority).toBeVisible();

        const selectedSalaryType = salaryPage.page.locator(
          `h6:has-text("${country}")`,
        );
        await expect(selectedSalaryType).toBeVisible();

        const selectedCurrency = salaryPage.page.locator(
          `p:has-text("${currency}")`,
        );
        await expect(selectedCurrency).toBeVisible();
      },
    );
  });
});
