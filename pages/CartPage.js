
  
 class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShopping = page.locator('#continue-shopping');
  }

  
 async itemCount() {
  return await this.items.count();
}

}

module.exports = { CartPage };