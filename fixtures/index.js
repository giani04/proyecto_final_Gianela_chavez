const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutInfoPage } = require('../pages/CheckoutInfoPage');
const checkoutData = require('../tests/checkout/checkout-data.json');

const test = base.test.extend({
  credentials: async ({}, use) => {
    await use({
      user: process.env.SAUCE_USER,
      password: process.env.SAUCE_PASSWORD,
    });
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Fixture encadenada: depende de loginPage y credentials
  loggedInPage: async ({ page, loginPage, credentials }, use) => {
    await loginPage.login(credentials.user, credentials.password);
    await base.expect(page).toHaveURL(/inventory\.html/);
    await use(page);
  },

  // Fixture encadenada: deja la sesión en "Checkout: Your Information"
  checkoutAtInfo: async ({ loggedInPage }, use) => {
    const home = new HomePage(loggedInPage);
    const cart = new CartPage(loggedInPage);

    await home.addToCartByName(checkoutData.product);
    await home.goToCart();
    await cart.checkoutButton.click();
    await base.expect(loggedInPage).toHaveURL(/checkout-step-one\.html/);

    await use(new CheckoutInfoPage(loggedInPage));
  },
});

module.exports = { test, expect: base.expect };