import { Locator, Page } from "@playwright/test";

import { BasePage } from "../base.page";

export class ProductsPage extends BasePage {
  public readonly selectSingleProduct: Locator;
  public readonly inventaryItem: Locator = this.page.locator(
    '[data-test="inventory-item"]',
  );
  public readonly getProductName: Locator = this.page.locator(
    '[data-test="inventory-item-name"]',
  );
  public readonly productPriceValue: Locator = this.page.locator(
    '[data-test="inventory-item-price"]',
  );
  public readonly productQuantityValue: Locator = this.page.locator(
    '[data-test="item-quantity"]',
  );
  public readonly addToCartBtn: Locator = this.page.locator("#add-to-cart");
  public readonly removeBtn: Locator = this.page.locator("#remove");
  public readonly backToProductsBtn: Locator =
    this.page.locator("#back-to-products");
  public readonly shoppingCartBadge: Locator = this.page.locator(
    '[data-test="shopping-cart-badge"]',
  );
  public readonly shoppingCartBtn: Locator = this.page.locator(
    "#shopping_cart_container",
  );
  public readonly continueShoppingBtn: Locator =
    this.page.locator("#continue-shopping");
  public readonly checkoutBtn: Locator = this.page.locator("#checkout");
  public readonly sortBtn: Locator = this.page.locator(
    '[data-test="product-sort-container"]',
  );

  public constructor(page: Page) {
    super(page);
  }

  public async selectProductByName(productName: string): Promise<void> {
    const selectSingleProduct = this.page.locator(
      `//div[text()='Sauce Labs ${productName}']`,
    );
    await selectSingleProduct.click();
  }

  public async getProductPrice(): Promise<string> {
    let productPrice = (await this.productPriceValue.textContent()) || "0";
    return productPrice;
  }
  public async addToCart(): Promise<void> {
    await this.addToCartBtn.waitFor({ state: "visible" });
    await this.addToCartBtn.click();
  }
  public async goToShoppingCart(): Promise<void> {
    await this.shoppingCartBtn.waitFor({ state: "visible" });
    await this.shoppingCartBtn.click();
  }
  public async validateShoppingCartPage(): Promise<void> {
    await Promise.all([
      this.removeBtn.isVisible(),
      this.continueShoppingBtn.isVisible(),
      this.checkoutBtn.isVisible(),
      this.getProductName.isVisible(),
    ]);
  }
  public async goToCheckoutPage(): Promise<void> {
    await this.checkoutBtn.waitFor({ state: "visible" });
    await this.checkoutBtn.click();
  }
}
