import { expect, Locator, Page } from '@playwright/test';
export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly errorButton: Locator;
    constructor (page: Page) {
        this.page = page;
        this.userName = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]')
        this. errorButton = page.locator('.error-button')
    };

    async goto(url) {
        await this.page.goto(url);
    }

    async waitForLoginPageToLoad() {
        await expect(this.userName).toBeVisible();   
    }

    async login(user_name, password) {
        await this.userName.fill(user_name);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyErrorMessage(errorMessage) {
        await expect(this.errorMessage).toContainText(errorMessage);
    }

    async clearErrorMessage() {
        await this.errorButton.click();
    }   
}