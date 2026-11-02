const { test, expect } = require('../../fixtures');

test.describe('Login', () => {
  test('login exitoso muestra la página de productos', async ({ page, loginPage, credentials }) => {
    await loginPage.login(credentials.user, credentials.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('usuario inválido muestra error', async ({ loginPage, credentials }) => {
    await loginPage.login('usuario_falso', credentials.password);

    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match any user in this service');
  });

  test('contraseña inválida muestra error', async ({ loginPage, credentials }) => {
    await loginPage.login(credentials.user, 'clave_falsa');

    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match any user in this service');
  });
});