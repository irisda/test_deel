import { Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export class LoginPage extends BasePage {
  public readonly userNameInputField: Locator =
    this.page.getByPlaceholder("Username");
  public readonly passwordInputField: Locator = this.page.locator(
    "//input[@type='password']",
  );
  public readonly loginButton: Locator = this.page.locator("#login-button");
  public readonly shoppingCartBtn: Locator = this.page.locator(
    "data-test=shopping-cart-link",
  );
  public readonly burgerMenu: Locator = this.page.locator(
    "#react-burger-menu-btn",
  );

  public async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    await this.userNameInputField.scrollIntoViewIfNeeded();
    await this.userNameInputField.fill(email);
    await this.passwordInputField.scrollIntoViewIfNeeded();
    await this.passwordInputField.fill(password);
    await this.loginButton.scrollIntoViewIfNeeded();
    await this.loginButton.click();
    await this.loginButton.waitFor({ state: "detached" });
  }

  public async goto(): Promise<void> {
    await super.goto("/", {
      waitUntil: "domcontentloaded",
    });
  }
}
