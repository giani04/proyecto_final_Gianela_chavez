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
});

module.exports = { test, expect: base.expect };