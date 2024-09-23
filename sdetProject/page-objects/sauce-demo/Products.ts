import { expect, Locator, Page } from '@playwright/test';
export class ProductsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly shoppingCartLink: Locator;
    readonly hamburgerMenuButton: Locator;
    readonly resetAppStateLink: Locator;
    readonly logoutLink: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.locator('.app_logo');
        this.productName = page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-list"]');
        this.productPrice = page.locator('[data-test="inventory-list"]');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.hamburgerMenuButton = page.locator('#react-burger-menu-btn');
        this.resetAppStateLink = page.locator('#reset_sidebar_link');
        this.logoutLink =  page.locator('#logout_sidebar_link');

    };

    async waitForProductsToLoad() {
        await expect(this.title).toBeVisible();   
    }

    async verifyProductDetails(productName, productDetails, productPrice) {
        await expect(this.productName).toContainText(productName);
        await expect(this.productDescription).toContainText(productDetails);
        await expect(this.productPrice).toContainText(productPrice);
    }

    async addProductToCart(productLink) {
        await this.page.locator(`#add-to-cart-${productLink}`).click();
    }   

    async gotoShoppingCart() {
        await this.shoppingCartLink.click();
    }

    async clickHamburgerMenu() {
        await this. hamburgerMenuButton.click();
        await expect(this.resetAppStateLink).toBeVisible();  
    }

    async clickResetAppStateLink() {
        await this.resetAppStateLink.click();  
    }

    async clickLogoutLink() {
        await this.logoutLink.click();  
    }
}