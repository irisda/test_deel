import { Page, Route } from "@playwright/test";

export type GotoOptions = {
  referer?: string;
  timeout?: number;
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
};

export type Cookie = {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};

export abstract class BasePage {
  public readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async goto(url: string = "/", options?: GotoOptions): Promise<void> {
    await this.page.goto(url, options);
  }

  public async setCookies(cookies: Array<Cookie>): Promise<void> {
    await this.page.context().addCookies(cookies);
  }

  public url(): string {
    return this.page.url();
  }

  public async reload(): Promise<void> {
    await this.page.reload({ waitUntil: "domcontentloaded" });
  }

  public async close(): Promise<void> {
    await this.page.close();
  }

  public async route(
    route: string | RegExp,
    fn: (route: Route) => Promise<void>,
  ): Promise<void> {
    await this.page.route(route, fn);
  }
}
