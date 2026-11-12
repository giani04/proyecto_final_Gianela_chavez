import {test, expect } from '@playwright/test';

test('validar el inicio de la pag', async ({ page }) => {
   await page.goto('https://practicesoftwaretesting.com/');
await page.getByTestId('product-name').click();
await page.getByTestId('product-name').first().click();
await page.getByTestId('product-name').filter({ hasText: 'Pliers' }).first().click();
}); 