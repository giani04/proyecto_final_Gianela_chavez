
const { test, expect } = require('@playwright/test');

test('buscar "xyz" no devuelve productos', async ({ page }) => {
  // --- Pasos escritos a mano ---
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('textbox', { name: 'Search' }).fill('xyz');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('There are no products found.')).toBeVisible();
  await expect(page.getByTestId('product-name')).toHaveCount(0);
});
