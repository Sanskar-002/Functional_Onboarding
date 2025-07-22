const { Given, Then } = require('cucumber');
const webdriverHelper = require('../helpers/webdriverHelper');

Given('I open Bing search page {string}', function (url) {
    return webdriverHelper.openUrl(url);
});

Then('the title is {string}', function (title) {
    return webdriverHelper.assertTitle(title);
});