import { Page } from '@playwright/test';
import {logger} from '@utils/logger';

export class LoginPage {
  readonly usernameInput = "//input[@id='user-name']";
  readonly passwordInput = "//input[@id='password']";
  readonly loginButton = "//input[@id='login-button']";

  constructor(public readonly page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    logger.info("Credentials are entered, Clicked on the Login Button");
  }

  async isLoggedOut(): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    return await this.page.isVisible(this.loginButton, { timeout: 20000 })
  }
}