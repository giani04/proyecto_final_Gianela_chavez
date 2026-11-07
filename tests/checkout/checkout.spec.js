const { test, expect } = require('../../fixtures');
const { HomePage } = require('../../pages/HomePage');
const { CheckoutOverviewPage } = require('../../pages/CheckoutOverviewPage');
const checkoutData = require('./checkout-data.json');

test.describe('Checkout', () => {
  let savedSession;

  // Inicia sesión una sola vez y guarda cookies y storage
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(process.env.BASE_URL);
    await page.locator('#user-name').fill(process.env.SAUCE_USER);
    await page.locator('#password').fill(process.env.SAUCE_PASSWORD);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory\.html/);
    savedSession = await context.storageState();
    await context.close();
  });

  test('CP-CHECKOUT-01: completar el pedido muestra la confirmación', async ({ checkoutAtInfo, loggedInPage }) => {
    const overview = new CheckoutOverviewPage(loggedInPage);

    await checkoutAtInfo.fillInfo(checkoutData);
    await checkoutAtInfo.continueToOverview();

    // Pantalla de resumen: el pago se valida aquí, porque SauceDemo no tiene transferencia
    await expect(loggedInPage).toHaveURL(/checkout-step-two\.html/);
    await expect(overview.paymentInfo).toContainText('SauceCard');
    await expect(overview.total).toBeVisible();

    await overview.finishOrder();

    await expect(loggedInPage).toHaveURL(/checkout-complete\.html/);
    await expect(overview.completeHeader).toHaveText('Thank you for your order!');
  });

  test('CP-CHECKOUT-02: sin nombre muestra error y no avanza', async ({ checkoutAtInfo, loggedInPage }) => {
    await checkoutAtInfo.lastName.fill(checkoutData.lastName);
    await checkoutAtInfo.postalCode.fill(checkoutData.postalCode);
    await checkoutAtInfo.continueToOverview();

    await expect(checkoutAtInfo.errorMessage).toHaveText('Error: First Name is required');
    await expect(loggedInPage).toHaveURL(/checkout-step-one\.html/);
  });

  test('CP-CHECKOUT-03: sin código postal muestra error y no avanza', async ({ checkoutAtInfo, loggedInPage }) => {
    await checkoutAtInfo.firstName.fill(checkoutData.firstName);
    await checkoutAtInfo.lastName.fill(checkoutData.lastName);
    await checkoutAtInfo.continueToOverview();

    await expect(checkoutAtInfo.errorMessage).toHaveText('Error: Postal Code is required');
    await expect(loggedInPage).toHaveURL(/checkout-step-one\.html/);
  });

  test('CP-CHECKOUT-04: con sesión guardada se llega al checkout sin login', async ({ browser }) => {
    // Usa el estado guardado en beforeAll: el login no es el objetivo de este test
    const context = await browser.newContext({ storageState: savedSession });
    const page = await context.newPage();
    await page.goto('/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');

    const home = new HomePage(page);
    await home.addToCartByName(checkoutData.product);
    await home.goToCart();
    await page.locator('#checkout').click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await context.close();
  });
});