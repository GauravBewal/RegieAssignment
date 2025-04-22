import { test, expect } from '@playwright/test';
import { UsersAPI } from '@api/users.api';
import { logger } from '@utils/logger';
import { apiNewUser } from '../../../testData/shared_constants';

const apiBaseURL = (process.env.apiBaseURL || '');

test.describe('Reqres.in Users API Tests', () => {
  let usersAPI: UsersAPI;

  test.beforeEach(async ({ request }) => {
    usersAPI = new UsersAPI(request, apiBaseURL);
    logger.info('Setting up UsersAPI before each test.');
  });


  test('Verify create a new user', async () => {
    logger.info('Starting test: Verify create a new user');
    const newUser = { name: apiNewUser.name, job: apiNewUser.job };
    const response = await usersAPI.createUser(newUser);
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
    expect(responseBody.name).toBe(newUser.name);
    expect(responseBody.job).toBe(newUser.job);
    logger.info('[Passed] New User created successfully');
    logger.info(`User created with ID: ${responseBody.id}`);
  });

  test('Verify get an existing user', async () => {
    logger.info('Starting test: Verify get an existing user');
    const userIdToGet = apiNewUser.id;
    const user = await usersAPI.getUser(userIdToGet);
    expect(user.data).toHaveProperty('id', userIdToGet);
    expect(user.data).toHaveProperty('email');
    expect(user.data).toHaveProperty('first_name');
    expect(user.data).toHaveProperty('last_name');
    expect(user.data).toHaveProperty('avatar');
    logger.info('[Passed] Getting details of the existing User');
    logger.info(`Retrieved user with ID: ${userIdToGet}, Email: ${user.data.email}`);
  });

  test('Verify update an existing user', async () => {
    logger.info('Starting test: Verify update an existing user');
    const userIdToUpdate = apiNewUser.id;
    const updatedUserData = { name: apiNewUser.name, job: apiNewUser.new_job };
    const response = await usersAPI.updateUser(userIdToUpdate, updatedUserData);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('updatedAt');
    expect(responseBody.name).toBe(updatedUserData.name);
    expect(responseBody.job).toBe(updatedUserData.job);
    logger.info('[Passed] Successfully Updated the details of Existing User');
    logger.info(`User with ID: ${userIdToUpdate} updated successfully.`);
  });

  test('Verify delete an existing user', async () => {
    logger.info('Starting test: Verify delete an existing user');
    const userIdToDelete = apiNewUser.id;
    const response = await usersAPI.deleteUser(userIdToDelete);
    expect(response.status()).toBe(204); // Successful deletion returns 204 No Content
    logger.info(`[Passed] User with ID: ${userIdToDelete} deleted successfully.`);
    // No response body for 204
  });
});