const { Given, Then } = require('@cucumber/cucumber');
const page = require('../../pages/automationPage');
const { client } = require('nightwatch-api');
const assert = require('assert');

Given('I navigate to the {string}', async function (url) {
  await page.openPage(url);
});

Then('the page title should match {string}', async function (expectedTitle) {
  const actualTitle = await page.getPageTitle();
  assert.strictEqual(actualTitle, expectedTitle);
});

Then('all links should return valid status codes', async function () {
  await page.validateLinksStatus(); // ✅ new method
});

Then('I should see no JavaScript console errors', async function () {
  const logs = await client.getLog('browser');

  if (!logs || !Array.isArray(logs)) {
    console.warn('⚠️ No browser logs were found or logs unsupported in this environment.');
    return;
  }

  const severeErrors = logs.filter(log => log.level === 'SEVERE');
  severeErrors.forEach(err => console.log(`🚨 JS Error: ${err.message}`));
  assert.strictEqual(severeErrors.length, 0, 'JavaScript console errors detected');
});
//git hub
