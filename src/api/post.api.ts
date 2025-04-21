import { APIRequestContext, expect } from '@playwright/test';

export class PostsAPI {
  constructor(private readonly request: APIRequestContext, private readonly baseURL: string) {}

  async getAllPosts() {
    const response = await this.request.get(`${this.baseURL}/users`);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async getPost(postId: number) {
    const response = await this.request.get(`${this.baseURL}/users/${postId}`);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }
}