const { client } = require('nightwatch-api');

module.exports = {
    openUrl: function(url) {
        return client.url(url).waitForElementVisible('body', 1000);
    },

    assertTitle: function(title) {
        return client.assert.title(title);
    },

    // Add more helper methods as needed
};