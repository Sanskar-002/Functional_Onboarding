const { Given, Then } = require('@cucumber/cucumber');
const { client } = require('nightwatch-api');
const assert = require('assert');

Given('I navigate to the {string}', async function (url) {
  // Access the page object via the client and call its navigate method
  // Note: .navigate() is a built-in command for page objects
  await client.page.automationPage().navigate(url);
  await client.waitForElementVisible('body', 10000);
});

Then('the page title should match {string}', async function (expectedTitle) {
  // ✅ CORRECTED: Changed to the valid Nightwatch assertion `assert.title()`
  await client.assert.title(expectedTitle);
});

Then('all links should open correctly in a new tab and match their href', function () {
  // Call the custom command from our page object
  client.page.automationPage().validateLinksInNewTabs();
});

Then('I should see no JavaScript console errors', async function () {
  const logs = await client.getLog('browser');
  if (!logs || !Array.isArray(logs)) {
    console.warn('⚠️ No browser logs were found or logs unsupported in this environment.');
    return;
  }
  const severeErrors = logs.filter(log => log.level === 'SEVERE');
  assert.strictEqual(severeErrors.length, 0, 'JavaScript console errors detected');
});