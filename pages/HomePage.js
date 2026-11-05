
  class HomePage {constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
    this.items = page.locator('.inventory_item');
    //this.sortSelect = page.locator('[data-test="product_sort_container"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  // Busca el producto por su nombre y hace clic en el botón de ese mismo ítem
  async addToCartByName(name) {
    await this.items
      .filter({ hasText: name })
      .locator('button')
      .click();
  }

  // Hace clic en el ícono del carrito
  async goToCart() {
    await this.cartLink.click();
  }

  // Abre el menú lateral y hace clic en "Logout"
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { HomePage };