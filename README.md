# Regie Automation Framework

## Folder Structure
### config - Contains configurations of each environment
### reports - HTML report generated after automation run get store here.
### src->api - Contains logical functions for API test cases
### src->pages - Contains each page objects with logical functions
### src->tests - Contains sub folders for API and UI tests and actual test cases
### utils - Contains common uitilites


## Pre-requisite

Your system should have the latest Node.js installed, with version v23.10 or above recommended.

## Framework Setup

1.  Navigate to the project directory:
    ```cd regRegieAssignment```

2.  Install project dependencies:
    ```npm install```

3.  Install Playwright browsers:
    ```npx playwright install```

## Running Tests

### Run Specific Test Suites or Tags:

* **UI Tests:**
    ```npm run test:ui```

* **API Tests:**
    ```npm run test:api```

### Run Single Test

To run a single test case, add `.only` to that specific test within your test file. Then, execute the test file using the Playwright CLI:


### Run smoke tests (tests tagged with @smoke):

```npm run test:smoke```

### Run sanity tests (tests tagged with @sanity):

```npm run test:sanity```

## To See The Report and Traces:

```npm run report:open``` 

```npx playwright show-trace test-results/<filename>.zip```


## For running on specific env - 

```NODE_ENV=staging  npm run test:ui```

## Run test cases using npx command
```npx playwright test src/tests/ui```
```npx playwright test src/tests/api```
```npx playwright show-report```

