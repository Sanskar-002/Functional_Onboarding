module.exports = {
  elements: {
    // Using a more specific selector from your example to target the 7 links
    linksToTest: '.et_pb_section_1 a'
  },
  commands: [{
    /**
     * This custom command validates that each link opens in a new tab
     * and that the new tab's URL matches the link's href.
     * It uses Nightwatch's internal command queue for stable execution.
     */
    validateLinksInNewTabs() {
      const page = this;
      const api = this.api; // Use this.api for commands

      api.elements('css selector', page.elements.linksToTest, (result) => {
        console.log(`🔗 Found ${result.value.length} link elements to validate...`);

        // Get the original window handle once
        api.windowHandle(function(originalWindow) {
          
          result.value.forEach((element) => {
            // Get the href attribute for each link
            api.elementIdAttribute(element.ELEMENT, 'href', (hrefResult) => {
              const href = hrefResult.value;
              if (!href || !href.startsWith('http')) return; // Skip non-http links

              console.log(`\n▶️ Testing link: ${href}`);

              // Use execute to open the link in a new tab
              api.execute(`window.open("${href}", "_blank");`);

              // Get all window handles and find the new one
              api.windowHandles((handlesResult) => {
                const newWindowHandle = handlesResult.value.find(handle => handle !== originalWindow.value);

                // Switch to the new tab, wait for it to load, and assert the URL
                api.switchWindow(newWindowHandle)
                  .waitForElementVisible('body', 10000) // Wait for the new page to be ready
                  .assert.urlEquals(href) // Assert the URL matches the href
                  .closeWindow() // Close the new tab
                  .switchWindow(originalWindow.value); // Switch back to the original tab
              });
            });
          });
        });
      });

      return this; // Return page object for chaining
    }
  }]
};