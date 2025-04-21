import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage'; // Should use the @pages alias
import { DashboardPage } from '@pages/DashboardPage'; // Should use the @pages alias

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});
export { expect }; // Re-export expect