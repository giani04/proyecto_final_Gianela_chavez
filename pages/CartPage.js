
  
 class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShopping = page.locator('#continue-shopping');
  }

  
  async itemCount() {
    await this.page.locator('.cart_item', { hasText: name }).click();
  }

}

module.exports = { CartPage };