const { client } = require('nightwatch-api');

module.exports = {
  async openNewTab(linkSelector) {
    // Get current tab handles
    const originalHandles = await client.windowHandles();
    const originalTabs = originalHandles?.value || [];

    // Click the link (must have target="_blank")
    await client.click(linkSelector);

    // Wait for new tab to appear
    let newHandles;
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      newHandles = await client.windowHandles();
      if (newHandles && newHandles.value.length > originalTabs.length) break;
    }

    if (!newHandles || !newHandles.value || newHandles.value.length <= originalTabs.length) {
      throw new Error(`❌ New tab did not open for selector: ${linkSelector}`);
    }

    const newTab = newHandles.value.find(h => !originalTabs.includes(h));
    if (!newTab) {
      throw new Error(`❌ Could not find new tab handle for selector: ${linkSelector}`);
    }

    await client.switchWindow(newTab);
    await client.waitForElementVisible('body', 10000);
  },

  async waitForElementVisible(selector, timeout = 5000) {
    return client.waitForElementVisible(selector, timeout);
  },

  async getAllLinks() {
    const result = await client.elements('css selector', 'a');
    const hrefs = [];

    for (const elem of result.value) {
      const href = await client.elementIdAttribute(elem.ELEMENT, 'href');
      if (href && href.value) {
        hrefs.push({ href: href.value, elementId: elem.ELEMENT });
      }
    }

    return hrefs;
  }
};
//git hub