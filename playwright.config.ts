import {devices, defineConfig} from '@playwright/test';
import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'default'}`) });

console.log(path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'default'}`));
console.log(process.env);

const baseURL = process.env.baseURL || 'https://www.saucedemo.com';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  retries: 1, // Retry flaky tests once
  reporter: 'html', // You can add other reporters here as well
  // Configure parallel execution
  workers: process.env.CI ? 2 : undefined,

  // 'use' is the shared section for all the projects 
  use: {
    baseURL: baseURL,
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
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
