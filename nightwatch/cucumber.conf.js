require('dotenv').config();
const { setDefaultTimeout, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { createSession, closeSession } = require('nightwatch-api');

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  await createSession({ env: 'browserstack' }); // 🔥 Force browserstack env
});

AfterAll(async () => {
  await closeSession();
});

//git hub