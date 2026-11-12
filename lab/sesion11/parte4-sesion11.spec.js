
const { test, expect } = require('@playwright/test');

async function buscar(page, texto) {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('textbox', { name: 'Search' }).fill(texto); // espera implícita (auto-waiting)
  await page.getByRole('button', { name: 'Search' }).click();      // espera implícita (auto-waiting)
}

test('v1 - lectura única (no espera)', async ({ page }) => {
  await buscar(page, 'xyz');

  // isVisible() mira la página una sola vez, sin esperar
  expect(await page.getByText('There are no products found.').isVisible()).toBe(true);
  await expect(page.getByTestId('product-name')).toHaveCount(0);
});

test('v2 - espera fija antes de la lectura', async ({ page }) => {
  await buscar(page, 'xyz');

  await page.waitForTimeout(3000);
  expect(await page.getByText('There are no products found.').isVisible()).toBe(true);
  await expect(page.getByTestId('product-name')).toHaveCount(0);
});

test('v3 - espera explícita (web-first assertion)', async ({ page }) => {
  await buscar(page, 'xyz');

  await expect(page.getByText('There are no products found.')).toBeVisible();
  await expect(page.getByTestId('product-name')).toHaveCount(0);
});
