import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    
    timeout: 100 * 2_000,
    expect: {
        timeout: 25 * 1_000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 1,
    workers: 1,
    reporter: process.env.CI
        ? [
              ['json', { outputFile: 'artifacts/common/report.json' }],
              ['html', { outputFolder: 'artifacts/common/html', open: 'never' }],
              ['allure-playwright', { detail: true, restulsDir: 'artifacts/common/allure', suiteTitle: true }],
          ]
        : [
              ['dot'],
              ['html', { outputFolder: 'artifacts/common/html', open: 'never' }],
              ['allure-playwright', { detail: true, resultsDir: 'artifacts/common/allure', suiteTitle: true }],
          ],
    use: {
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
        actionTimeout: 20 * 1_000,
    },
    projects: [
        {
            name: 'Google Chrome',
            testIgnore: /.*(teardown|setup)\.ts/,
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
                headless: true,
                launchOptions: { slowMo: 500 },
            },
        }
    ],
    outputDir: 'test-results/',
});
