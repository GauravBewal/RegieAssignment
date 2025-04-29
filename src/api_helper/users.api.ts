import { APIRequestContext, expect } from '@playwright/test';

export class UsersAPI {
  private apiKey: string | null = null; // To store the API key

  constructor(private readonly request: APIRequestContext, private readonly baseURL: string) {}

  async setApiKey(key: string) {
    this.apiKey = key;
    console.log("API Key set:", this.apiKey);
  }

  async createUser(userData: { name: string; job: string }) {
    const headers: { [key: string]: string } = this.apiKey ? { 'x-api-key': this.apiKey } : {};
    const response = await this.request.post(`${this.baseURL}/users`, {
      data: userData,
      headers: headers
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
    const headers: { [key: string]: string } = this.apiKey ? { 'x-api-key': this.apiKey } : {};
    const response = await this.request.put(`${this.baseURL}/users/${userId}`, {
      data: userData,
      headers:headers
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async deleteUser(userId: number) {
    const headers: { [key: string]: string } = this.apiKey ? { 'x-api-key': this.apiKey } : {};
    console.log(`${this.baseURL}/users/${userId}`);
    const response = await this.request.delete(`${this.baseURL}/users/${userId}`, {
      headers: headers
    });
    expect(response.status()).toBe(204); // No content on successful deletion
    return response;
  }
}