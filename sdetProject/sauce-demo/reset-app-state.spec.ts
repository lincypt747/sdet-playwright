// end to end workflow - Login, add an item to cart, verify cart and checkout

import { test } from '@playwright/test';
import data from './data.json';
import { LoginPage } from '../page-objects/sauce-demo/Login';
import { ProductsPage } from "../page-objects/sauce-demo/Products";
import { CartPage } from "../page-objects/sauce-demo/Cart";



test.describe.parallel('Test Swaglabs website', () => {
    test('product checkout e2e', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        //Login with standard user
        await loginPage.goto(data.url);
        await loginPage.login(data.userName, data.password);

        //Products Page - verify products page and add one item to cart 
        await productsPage.waitForProductsToLoad();
        await productsPage.verifyProductDetails(data.productName, data.productDescription, data.productPrice);
        await productsPage.addProductToCart(data.productLink);
        await productsPage.gotoShoppingCart();

        //Cart Page - verify cart is showing added item and continue shopping
        await cartPage.waitForCartPageToLoad();
        await cartPage.verifyCart(data.productName, data.productDescription);
        await cartPage.continueShopping();

        //Products Page - click reset app state link
        await productsPage.waitForProductsToLoad();
        await productsPage.clickHamburgerMenu();
        await productsPage.clickResetAppStateLink();
        await productsPage.gotoShoppingCart();

        //Cart Page - verify cart is empty after clicking reset app state link
        await cartPage.waitForCartPageToLoad();
        await cartPage.verifyCartIsEmpty();
        await cartPage.continueShopping();

        //Products Page - Logout from products page
        await productsPage.waitForProductsToLoad();
        await productsPage.clickHamburgerMenu();
        await productsPage.clickLogoutLink();

        //Verify Logout took you back to login page
        await loginPage.waitForLoginPageToLoad();
    })
})