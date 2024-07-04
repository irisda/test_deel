import { Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class PaymentConfirmationPage extends BasePage {
  public readonly productPriceValue: Locator = this.page.locator(
    '[data-test="inventory-item-price"]',
  );
  public readonly paymentLabel: Locator = this.page.locator(
    '[data-test="payment-info-label"]',
  );
  public readonly totalPrice: Locator = this.page.locator(
    '[data-test="total-label"]',
  );

  public async getTotalPrice(): Promise<string> {
    let totalPrice = (await this.totalPrice.textContent()) || "0";
    totalPrice = totalPrice.split("Total:")[1];

    return totalPrice;
  }
}
