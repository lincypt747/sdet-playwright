import { expect, Locator, Page } from '@playwright/test';
export class CheckoutCompletePage {
    readonly page: Page;
    readonly title: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backToHomeButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.completeText= page.locator('.complete-text');
        this.backToHomeButton = page.locator('#back-to-products');
    };

    async waitForCheckoutPageToLoad() {
        await expect(this.backToHomeButton).toBeVisible();   
    }

    async verifyDetails() {
        await expect(this.completeHeader).toContainText('Thank you for your order!');
        await expect(this.completeText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }
    async backToHome() {
        await this.backToHomeButton.click();
    }   
}