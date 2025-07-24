require('dotenv').config();

module.exports = {
  src_folders: [],
  // ✅ ADDED: This line is essential for Nightwatch to find your page object files.
  page_objects_path: ['pages'], 
  test_settings: {
    default: {
      webdriver: {
        start_process: false,
        host: 'hub-cloud.browserstack.com',
        port: 443
      },
      desiredCapabilities: {
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        browserName: 'chrome'
      }
    },
    browserstack: {
      webdriver: {
        start_process: false,
        host: 'hub-cloud.browserstack.com',
        port: 443
      },
      desiredCapabilities: {
        'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
        browserName: 'chrome'
      }
    }
  }
};