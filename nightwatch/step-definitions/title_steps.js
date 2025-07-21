const { Given, Then } = require('cucumber');
const { client } = require('nightwatch-api');

Given('I open Bing search page {string}', function (url) {
    return client.url(url).waitForElementVisible('body', 1000);
});

Then('the title is {string}', function (title) {
    return client.assert.title(title);
});