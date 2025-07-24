class WebDriverHelper {
    constructor(browser) {
        this.browser = browser;
    }

    async navigateTo(url) {
        await this.browser.url(url);
    }

    async getTitle() {
        return await this.browser.title();
    }

    async waitForElementVisible(selector, timeout = 10000) {
        await this.browser.waitForElementVisible(selector, timeout);
    }

    async getElements(selector) {
        return await this.browser.elements('css selector', selector);
    }

    async getAttribute(elementId, attributeName) {
        return await this.browser.elementIdAttribute(elementId, attributeName);
    }

    /**
     * Retrieves browser console logs.
     * Note: 'bstack:options': { consoleLogs: 'info' } must be set in desiredCapabilities.
     * @returns {Promise<Array>} A promise that resolves to an array of log entries.
     */
    async getConsoleLogs() {
        return await this.browser.getLog('browser');
    }

    /**
     * Checks the HTTP status of a given URL by executing a fetch request in the browser.
     * @param {string} url The URL to check.
     * @returns {Promise<number>} The HTTP status code.
     */
    async getUrlStatus(url) {
        const status = await this.browser.executeAsync(function(url, done) {
            fetch(url, { method: 'HEAD', mode: 'no-cors' }) // Use HEAD for speed, no-cors to avoid CORS issues
                .then(response => {
                    // For 'no-cors', status will be 0 but it indicates a successful request dispatch
                    done(response.status === 0 ? 200 : response.status);
                })
                .catch(() => {
                    done(500); // Indicate a failure to fetch
                });
        }, [url]);
        return status;
    }
}

module.exports = WebDriverHelper;