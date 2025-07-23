const { client } = require('nightwatch-api');
const { waitForElementVisible } = require('../helpers/webdriver.helper');
const fetch = require('node-fetch');


module.exports = {
  elements: {
    allLinks: 'a'
  },

  async openPage(url) {
    await client.url(url);
    await waitForElementVisible('body');
  },

  async getPageTitle() {
    return new Promise((resolve, reject) => {
      client.title(result => {
        if (result.status === 0 && result.value) {
          console.log('🔍 Page title:', result.value);
          resolve(result.value);
        } else {
          console.error('❌ Failed to get page title:', result);
          reject(new Error('Could not retrieve page title.'));
        }
      });
    });
  },

  async getAllLinks() {
    return new Promise((resolve, reject) => {
      client.elements('css selector', 'a', result => {
        if (result.status === 0 && result.value) {
          console.log(`🔗 Found ${result.value.length} links`);
          resolve(result.value);
        } else {
          console.error('❌ Failed to retrieve links:', result);
          reject(new Error('Could not retrieve links'));
        }
      });
    });
  },

  async getHrefFromElement(elementId) {
    return new Promise((resolve, reject) => {
      client.elementIdAttribute(elementId, 'href', result => {
        if (result.status === 0) {
          resolve(result.value || null); // Return null if empty
        } else {
          resolve(null); // Gracefully skip bad elements
        }
      });
    });
  },

  async validateLinksStatus() {
    const links = await this.getAllLinks();
    const hrefs = [];

    for (const link of links) {
      const href = await this.getHrefFromElement(link.ELEMENT);
      if (href && href.startsWith('http')) {
        hrefs.push(href);
      }
    }

    console.log(`🌐 Validating ${hrefs.length} external links...`);

    for (const href of hrefs) {
      try {
        const response = await fetch(href, { method: 'HEAD', timeout: 10000 });
        const status = response.status;
        if (status >= 200 && status < 400) {
          console.log(`✅ ${href} returned ${status}`);
        } else {
          console.warn(`⚠️ ${href} returned status ${status}`);
        }
      } catch (error) {
        console.error(`❌ Error fetching ${href}: ${error.message}`);
      }
    }
  }
};
//git hub