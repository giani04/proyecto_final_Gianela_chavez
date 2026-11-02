const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login exitoso muestra la página de productos', async ({ page }) => {
    await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('usuario inválido muestra error', async () => {
    await loginPage.login('usuario_falso', process.env.SAUCE_PASSWORD);

    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match any user in this service');
  });

  test('contraseña inválida muestra error', async () => {
    await loginPage.login(process.env.SAUCE_USER, 'clave_falsa');

    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match any user in this service');
  });
});