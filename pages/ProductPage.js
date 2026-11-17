class ProductPage {
  constructor(page) {
  this.page = page;
  this.name = page.locator('.inventory_details_name');
  this.price = page.locator('.inventory_details_price');
  this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
}
  
  async openDetail(name) {
  await this.page.locator('.inventory_item_name', { hasText: name }).click();
}
}

module.exports = { ProductPage };