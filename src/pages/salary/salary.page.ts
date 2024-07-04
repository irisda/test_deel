import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

export class salaryPage extends BasePage {
  public readonly selectRoleInputField: Locator =
    this.page.getByPlaceholder("Select a role");
  public readonly openDropdown: Locator = this.page.locator(
    '//*[@aria-label="Open"]',
  );
  public readonly selectCountryInputField: Locator =
    this.page.getByPlaceholder("Select a country");
  public readonly getInsightsButton: Locator =
    this.page.locator('[type="submit"]');
  public readonly insightsHeader: Locator = this.page.locator("h3");

  public async selectRole({ jobTitle }: { jobTitle: string }): Promise<void> {
    await this.selectRoleInputField.click();
    await this.openDropdown.nth(0).scrollIntoViewIfNeeded();
    await this.openDropdown.nth(0).click();
    const getJobTitle = this.page.locator(`[data-text="${jobTitle}"]`);
    await getJobTitle.click();
  }

  public async selectCountry({ country }: { country: string }): Promise<void> {
    await this.selectCountryInputField.fill(country);
    await this.page.keyboard.down("ArrowDown");
    await this.page.keyboard.down("Enter");
    await this.getInsightsButton.scrollIntoViewIfNeeded();
    await this.getInsightsButton.click();
  }

  public async goto(): Promise<void> {
    await super.goto("/dev/salary-insights.html", {
      waitUntil: "domcontentloaded",
    });
  }
}
