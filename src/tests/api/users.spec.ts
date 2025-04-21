import { test, expect } from '@playwright/test';
import { UsersAPI } from '@api/users.api';
import { logger } from '@utils/logger';

const apiBaseURL = (process.env.apiBaseURL || '');

test.describe('Reqres.in Users API Tests', () => {
  let usersAPI: UsersAPI;

  test.beforeEach(async ({ request }) => {
    usersAPI = new UsersAPI(request, apiBaseURL);
    console.log("apiBaseURL - ", apiBaseURL);
    logger.info('Setting up UsersAPI before each test.');
  });

  test('should create a new user', async () => {
    logger.info('Starting test: should create a new user');
    const newUser = { name: 'morpheus', job: 'leader' };
    const response = await usersAPI.createUser(newUser);
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
    expect(responseBody.name).toBe(newUser.name);
    expect(responseBody.job).toBe(newUser.job);
    logger.info(`User created with ID: ${responseBody.id}`);
  });

  test('should get an existing user', async () => {
    logger.info('Starting test: should get an existing user');
    const userIdToGet = 2;
    const user = await usersAPI.getUser(userIdToGet);
    expect(user.data).toHaveProperty('id', userIdToGet);
    expect(user.data).toHaveProperty('email');
    expect(user.data).toHaveProperty('first_name');
    expect(user.data).toHaveProperty('last_name');
    expect(user.data).toHaveProperty('avatar');
    logger.info(`Retrieved user with ID: ${userIdToGet}, Email: ${user.data.email}`);
  });

  test('should update an existing user', async () => {
    logger.info('Starting test: should update an existing user');
    const userIdToUpdate = 2;
    const updatedUserData = { name: 'morpheus', job: 'zion resident' };
    const response = await usersAPI.updateUser(userIdToUpdate, updatedUserData);
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('updatedAt');
    expect(responseBody.name).toBe(updatedUserData.name);
    expect(responseBody.job).toBe(updatedUserData.job);
    logger.info(`User with ID: ${userIdToUpdate} updated successfully.`);
  });

  test('should delete an existing user', async () => {
    logger.info('Starting test: should delete an existing user');
    const userIdToDelete = 2;
    const response = await usersAPI.deleteUser(userIdToDelete);
    expect(response.status()).toBe(204); // Successful deletion returns 204 No Content
    logger.info(`User with ID: ${userIdToDelete} deleted successfully.`);
    // No response body for 204
  });
});