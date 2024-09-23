import { expect, Locator, Page } from '@playwright/test';
export class CartPage {
    readonly page: Page;
    readonly title: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.productName = page.locator('.inventory_item_name');
        this.productDescription= page.locator('.inventory_item_desc');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    };

    async waitForCartPageToLoad() {
        await expect(this.checkoutButton).toBeVisible();   
    }

    async verifyCart(productName, productDescription) {
        await expect(this.title).toContainText('Your Cart');
        await expect(this.productName).toContainText(productName);
        await expect(this.productDescription).toContainText(productDescription)
    }

    async checkout() {
        await this.checkoutButton.click();
    }   

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async verifyCartIsEmpty() {
        await expect(this.productName).toHaveCount(0);
    }
}