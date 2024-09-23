import { expect, Locator, Page } from '@playwright/test';
export class CheckoutPage {
    readonly page: Page;
    readonly title: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueButton: Locator

    constructor (page: Page) {
        this.page = page;
        this.title = page.locator('.title]');
        this.firstName = page.locator('#first-name');
        this.lastName= page.locator('#last-name');
        this.zipCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
    };

    async waitForCheckoutPageToLoad() {
        await expect(this.continueButton).toBeVisible();   
    }

    async fillDetails(firstName, lastName, zipCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
        await this.continueButton.click();
    }
}