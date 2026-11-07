class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.paymentInfo = page.locator('.summary_info .summary_value_label').first();
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
 
    // Pantalla "Checkout: Complete!"
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
  }
 
  async finishOrder() {
    await this.finishButton.click();
  }
}
 
module.exports = { CheckoutOverviewPage };
 