// login verification, negative test case and positive test case
import { test, expect } from '@playwright/test';
import data from './data.json';
import { LoginPage } from '../page-objects/sauce-demo/Login';
import { ProductsPage } from "../page-objects/sauce-demo/Products";


test.describe.parallel('Test Swaglabs website', () => {
    test('login verification', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        //Login - negative test case Password is required
        await loginPage.goto(data.url);
        await loginPage.login(data.problemUserName, "");
        await loginPage.verifyErrorMessage(data.passwordErrorMessage);
        await loginPage.clearErrorMessage();

        //Login - negative test case User Name is required
        await loginPage.login("", "");
        await loginPage.verifyErrorMessage(data.userNameErrorMessage);
        await loginPage.clearErrorMessage();

        //Login verification - positive test case
        await loginPage.login(data.problemUserName, data.password);
        await productsPage.waitForProductsToLoad();
    })
})