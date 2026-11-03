const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const test = base.test.extend({
  credentials: async ({}, use) => {
    await use({
      user: process.env.SAUCE_USER,
      password: process.env.SAUCE_PASSWORD,
    });
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Fixture encadenada: depende de loginPage y credentials
  loggedInPage: async ({ page, loginPage, credentials }, use) => {
    await loginPage.login(credentials.user, credentials.password);
    await base.expect(page).toHaveURL(/inventory\.html/);
    await use(page);
  },
});

module.exports = { test, expect: base.expect };