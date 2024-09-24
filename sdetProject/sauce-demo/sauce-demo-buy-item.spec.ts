// end to end workflow - Login, add an item to cart, verify cart and checkout

import { test, expect } from '@playwright/test';
import data from './data.json';
import { LoginPage } from '../page-objects/sauce-demo/Login';
import { ProductsPage } from "../page-objects/sauce-demo/Products";
import { CartPage } from "../page-objects/sauce-demo/Cart";
import { CheckoutPage } from "../page-objects/sauce-demo/Checkout";
import { CheckoutOverviewPage} from "../page-objects/sauce-demo/CheckoutOverview";
import { CheckoutCompletePage } from "../page-objects/sauce-demo/checkoutComplete";


test.describe.parallel ('Test Swaglabs website', () => {
    test('product checkout e2e',  async ({ page }) => {
       
       //Login with standard user
        const loginPage = new LoginPage(page);
        await loginPage.goto(data.url);
        await loginPage.login(data.userName, data.password);
    
        //Products Page - Verify products page and add item to cart
        const productsPage = new ProductsPage(page);
        await productsPage.waitForProductsToLoad();
        await productsPage.verifyProductDetails(data.productName, data.productDescription, data.productPrice);
        await productsPage.addProductToCart(data.productLink);
        await productsPage.gotoShoppingCart();
       
        //Cart Page - verify cart and checkout
        const cartPage = new CartPage(page);
        await cartPage.waitForCartPageToLoad();
        await cartPage.verifyCart(data.productName, data.productDescription);
        await cartPage.checkout();

        //Checkout Page - verify checkout page and add user details
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.waitForCheckoutPageToLoad();
        await checkoutPage.fillDetails(data.firstName, data.lastName, data.zipCode);

        //Checkout Overview Page - verify checkout overview page
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.waitForCheckoutPageToLoad();
        await checkoutOverviewPage.verifyDetails(data.productName, data.productPrice, data.paymentInfo, data. totalAmount);
        await checkoutOverviewPage.finishOrder();

        //Checkout Complete Page - verify checkout complete page
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await checkoutCompletePage.waitForCheckoutPageToLoad();
        await checkoutCompletePage.verifyDetails();
        await checkoutCompletePage.backToHome();
        await productsPage.waitForProductsToLoad();
    })

})