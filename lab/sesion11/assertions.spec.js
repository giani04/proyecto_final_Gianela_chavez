import { test, expect } from '@playwright/test';

test('login exitoso muestra la página de productos', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.waitForURL(/inventory\.html/);

  // Assertions
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
  await expect(page.locator('.inventory_list')).toBeVisible();
});

test('usuario inválido muestra error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('usuario_falso');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page.locator('[data-test="error"]')).toContainText('do not match any user');
});

 test('contraseña inválida muestra error', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('clave_falsa');
    await page.locator('#login-button').click();    

    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
  });