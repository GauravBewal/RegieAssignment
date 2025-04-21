Folder Structure
config - Contains configurations of each environment
reports - HTML report generated after automation run get store here.
src->api - 
src->pages - Contains each page objects with logical functions
src->tests - Contains sub folders for API and UI tests and actual test cases
utils - Contains common uitilites



Pre-requisite
Your system should have latest nodejs installed, recommended v23.10 or above.


Framework Setup - 
cd regie
npm install
npx playwright install

Run Specific Test Suites or Tags:
npm run test:ui
npm run test:api

Run smoke tests (tests tagged with @smoke):
npm run test:smoke

Run sanity tests (tests tagged with @sanity):
npm run test:sanity

To See The Report:
npm run report:open 


For running on specific env - 
NODE_ENV=staging  npm run test:ui

