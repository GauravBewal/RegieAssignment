import { APIRequestContext, expect } from '@playwright/test';

export class UsersAPI {
  constructor(private readonly request: APIRequestContext, private readonly baseURL: string) {}

  async createUser(userData: { name: string; job: string }) {
    const response = await this.request.post(`${this.baseURL}/users`, {
      data: userData,
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async getUser(userId: number) {
    const response = await this.request.get(`${this.baseURL}/users/${userId}`);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async updateUser(userId: number, userData: { name: string; job: string }) {
    const response = await this.request.put(`${this.baseURL}/users/${userId}`, {
      data: userData,
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async deleteUser(userId: number) {
    const response = await this.request.delete(`${this.baseURL}/users/${userId}`);
    expect(response.status()).toBe(204); // No content on successful deletion
    return response;
  }
}