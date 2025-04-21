import { Page } from '@playwright/test';

export class DashboardPage {
  private readonly dashboardTitle = "//div[contains(text(),'Products')]";
  private readonly main_menu = "//button[contains(text(),'Open Menu')]";
  private readonly logout_opt = "//a[@id='logout_sidebar_link']";

  constructor(public readonly page: Page) {}

  async getDashboardHeader(): Promise<string | null> {
    return await this.page.textContent(this.dashboardTitle);
  }

  async logout(): Promise<void> {
    await this.page.click(this.main_menu);
    await this.page.click(this.logout_opt);
  }

}