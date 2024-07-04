import { Locator } from "@playwright/test";
import { BasePage } from "../base.page";
import { checkoutDetailsData } from "../../types/ui/checkoutDetails.type";

export class CheckoutPage extends BasePage {
  public readonly firstNameInput: Locator =
    this.page.getByPlaceholder("First Name");
  public readonly lastNameInput: Locator =
    this.page.getByPlaceholder("Last Name");
  public readonly ZipCodeInput: Locator = this.page.locator("#postal-code");
  public readonly continueBtn: Locator = this.page.locator("#continue");
  public readonly finishBtn: Locator = this.page.locator("#finish");
  public readonly backToHomeBtn: Locator = this.page.locator(
    '[data-test="back-to-products"]',
  );
  public readonly orderConfimrationText: Locator = this.page.locator(
    '[data-test="complete-header"]',
  );

  public async addCheckoutUserDetails({
    firstName,
    lastName,
    zipCode,
  }: checkoutDetailsData): Promise<void> {
    await this.firstNameInput.scrollIntoViewIfNeeded();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.scrollIntoViewIfNeeded();
    await this.lastNameInput.fill(lastName);
    await this.ZipCodeInput.scrollIntoViewIfNeeded();
    await this.ZipCodeInput.fill(zipCode);
  }

  public async continueWithCheckout(): Promise<void> {
    await this.continueBtn.scrollIntoViewIfNeeded();
    await this.continueBtn.click();
  }
}
