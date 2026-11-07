const { test, expect } = require('../../fixtures');
const { HomePage } = require('../../pages/HomePage');
const { CartPage } = require('../../pages/CartPage');

test.use({ baseURL: process.env.SHOP_URL });

test('CP-TIENDA-01', async ({ loggedInPage }) => {
  const home = new HomePage(loggedInPage);
  const cart = new CartPage(loggedInPage);

  await home.addToCartByName('Sauce Labs Backpack');
  await expect(home.cartBadge).toHaveText('1');

  await home.goToCart();
  await expect(loggedInPage).toHaveURL(/cart\.html/);
await expect(cart.items).toHaveCount(1);

});