const { test, expect } = require('../../fixtures');
test.describe.configure({ retries: 2 });

test.describe('Sesión', () => {
  // Test sin login: la fixture ya dejó la sesión iniciada
  test('la página de productos carga con sesión iniciada', async ({ loggedInPage }) => {
    await expect(loggedInPage.locator('.title')).toHaveText('Products');
  });

  test('cerrar sesión regresa a la página de login', async ({ loggedInPage }) => {
    await loggedInPage.locator('#react-burger-menu-btn').click();
    await loggedInPage.locator('#logout_sidebar_link').click();

    await expect(loggedInPage.locator('#login-button')).toBeVisible();
    await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/');
  });
});