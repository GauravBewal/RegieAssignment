import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import {logger} from './logger'
class CustomHTMLReporter implements Reporter {
  outputFile = path.join(__dirname, '../reports/index.html');
  results: { [key: string]: any }[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    logger.info("Starting tests");
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const browserName = test.parent?.project()?.name || 'N/A';
    this.results.push({
      name: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
      attachments: result.attachments.map(a => ({ name: a.name, path: a.path })),
      browser: browserName,
    });
  }

  async onEnd(result: FullResult) {
    logger.info(`Finished with status: ${result.status}`);
    await this._generateReport();
  }

  async _generateReport() {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Playwright Test Report</title>
        <style>
          body { font-family: sans-serif; }
          .test-case { margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; }
          .status-passed { background-color: #e6ffe6; }
          .status-failed { background-color: #ffe6e6; }
          .status-skipped { background-color: #f0f0f0; }
          .error { color: red; font-weight: bold; }
          .attachment { margin-top: 5px; }
        </style>
      </head>
      <body>
        <h1>Playwright Test Report</h1>
        ${this.results.map(test => `
          <div class="test-case status-${test.status}">
            <h3>${test.name}</h3>
            <p>Status: ${test.status}</p>
            <p>Duration: ${test.duration}ms</p>
            <p class="browser-info">Browser: ${test.browser}</p>
            ${test.error ? `<p class="error">Error: ${test.error}</p>` : ''}
            ${test.attachments.map(attachment => `
              <div class="attachment">
                <a href="${path.relative('../../reports', attachment.path)}">${attachment.name}</a>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </body>
      </html>
    `;
    fs.writeFileSync(this.outputFile, html);
    logger.info(`HTML report generated at: ${this.outputFile}`);
  }
}

export default CustomHTMLReporter;