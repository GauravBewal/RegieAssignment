How to run the test case
cd regie
npm install
npx playwright install

Run Specific Test Suites or Tags:
npm run test:all
npm run test:ui
npm run test:api

Run smoke tests (tests tagged with @smoke):
npm run test:smoke

Run sanity tests (tests tagged with @sanity):
npm run test:sanity

Custom HTML Report: 
After the tests have finished running, a custom HTML report will be generated in the reports directory (reports/index.html). You can open this file in your web browser to view a more detailed report with the status of each test, duration, and any error messages or attachments (like screenshots on failure). To easily open it, you can run:
npm run report:open