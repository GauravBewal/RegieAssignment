import { test, expect } from '@utils/test-base'; // Should use the @utils alias

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/v1/index.html');
  });
  test.afterEach(async ({ page }) => {
    await page.close()
  });

  test('verify user login successfully @smoke', async ({ loginPage, dashboardPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    const header = await dashboardPage.getDashboardHeader();
    expect(header).toContain('Products');
    await dashboardPage.logout();
    expect(await loginPage.isLoggedOut()).toBe(true);

  });

});