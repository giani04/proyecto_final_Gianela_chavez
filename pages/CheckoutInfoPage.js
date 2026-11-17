class CheckoutInfoPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Llena el formulario "Your Information" con los datos del JSON
  async fillInfo(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.postalCode.fill(data.postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }
}

module.exports = { CheckoutInfoPage };