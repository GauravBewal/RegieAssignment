import {devices, defineConfig} from '@playwright/test';
import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: path.resolve(__dirname+'/config', `.env.${process.env.NODE_ENV || 'default'}`) });

export default defineConfig({
  testDir: './src/tests',
  outputDir: '.test-results',
  timeout: 30 * 1000,
  retries: 1, // Retry flaky tests once
  reporter: 'html', // You can add other reporters here as well
  // Configure parallel execution
  workers: process.env.CI ? 2 : undefined,

  // 'use' is the shared section for all the projects 
  use: {
    baseURL: process.env.baseURL,
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    // launchOptions: {
    //   slowMo: 50,
    // },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: false },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: false },
    }
  ]
});
