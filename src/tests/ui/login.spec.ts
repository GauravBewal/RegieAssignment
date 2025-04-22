import { test, expect } from '@utils/test-base'; // Should use the @utils alias
import {logger} from '@utils/logger';
import { validCredentials} from '../../../testData/shared_constants';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/v1/index.html');
  });
  test.afterEach(async ({ page }) => {
    await page.close()
  });

  test('Verify user login successfully with correct credentials @smoke', async ({ loginPage, dashboardPage }) => {
    logger.info("Login page is visible, doing login through valid credentials");
    await loginPage.login(validCredentials.username, validCredentials.password);
    const header = await dashboardPage.getDashboardHeader();
    expect(header).toContain('Products');
    logger.info("[Passed] Login Successfully, Dashboard page is visible");
    await dashboardPage.logout();
    expect(await loginPage.isLoggedOut()).toBe(true);
    logger.info("[Passed] Logout Successfully, Login page is visible");
  });

});