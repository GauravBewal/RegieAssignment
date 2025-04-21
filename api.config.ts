import {devices, defineConfig} from '@playwright/test';
import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'default'}`) });

console.log(path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'default'}`));
console.log(process.env);

const apiBaseURL = process.env.apiBaseURL || 'https://reqres.in/api';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  retries: 1, // Retry flaky tests once
  reporter: 'html', // You can add other reporters here as well
  // Configure parallel execution
//   workers: process.env.CI ? 2 : undefined,

  // 'use' is the shared section for all the projects 
  use: {
    baseURL: apiBaseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
        name: 'api',
        testMatch: 'src/tests/api/*.spec.ts',
        use: {
        //   request: {
        //     // Default API request options (e.g., headers, authentication)
        //   },
        },
      },
  ]
});
