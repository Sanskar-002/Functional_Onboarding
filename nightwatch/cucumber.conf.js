const { setDefaultTimeout, Before, After, AfterAll } = require('@cucumber/cucumber');
const { createSession, closeSession, client } = require('nightwatch-api');

// Set the default timeout for asynchronous steps
setDefaultTimeout(60 * 1000);

// Use Before hook to create the browser session
Before(async function() {
  await createSession();
});

// Use After hook to close the browser session
After(async function() {
  await closeSession();
});