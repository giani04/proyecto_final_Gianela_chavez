const { test, expect } = require('../../fixtures');
const { HomePage } = require('../../pages/HomePage');
test.describe.configure({ retries: 2 });

// Convierte textos como "$29.99" a número
const toPrice = (text) => parseFloat(text.replace('$', ''));

test.describe('Ordenar productos', () => {
  test('ordenar por nombre A a Z muestra los productos alfabéticamente', async ({ loggedInPage }) => {
    const home = new HomePage(loggedInPage);
    const nombres = loggedInPage.locator('.inventory_item_name');

    await home.sortSelect.selectOption('az');

    const actual = await nombres.allTextContents();
    expect(actual).toEqual([...actual].sort((a, b) => a.localeCompare(b)));
  });

  test('ordenar por precio de menor a mayor muestra los precios ascendentes', async ({ loggedInPage }) => {
    const home = new HomePage(loggedInPage);
    const precios = loggedInPage.locator('.inventory_item_price');

    await home.sortSelect.selectOption('lohi');

    const actual = (await precios.allTextContents()).map(toPrice);
    expect(actual).toEqual([...actual].sort((a, b) => a - b));
  });

  test('ordenar por nombre Z a A muestra los productos en orden inverso', async ({ loggedInPage }) => {
    const home = new HomePage(loggedInPage);
    const nombres = loggedInPage.locator('.inventory_item_name');

    await home.sortSelect.selectOption('za');

    const actual = await nombres.allTextContents();
    expect(actual).toEqual([...actual].sort((a, b) => b.localeCompare(a)));
  });
});