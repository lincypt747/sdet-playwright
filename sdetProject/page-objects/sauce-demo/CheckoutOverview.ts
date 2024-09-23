import { expect, Locator, Page } from '@playwright/test';
export class CheckoutOverviewPage {
    readonly page: Page;
    readonly title: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly paymentInfo: Locator;
    readonly totalAmount: Locator;
    readonly finishButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.itemName = page.locator('.inventory_item_name');
        this.itemPrice= page.locator('.inventory_item_price');
        this.paymentInfo = page.locator('[data-test="payment-info-value"]');
        this.totalAmount = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('#finish');
    };

    async waitForCheckoutPageToLoad() {
        await expect(this.finishButton).toBeVisible();   
    }

    async verifyDetails(productName, productPrice, paymentInfo, totalAmount) {
        await expect(this.itemName).toContainText(productName);
        await expect(this.itemPrice).toContainText(productPrice);
        await expect(this.paymentInfo).toContainText(paymentInfo);
        await expect(this.totalAmount).toContainText(totalAmount);
    }
    async finishOrder() {
        await this.finishButton.click();
    }   
}