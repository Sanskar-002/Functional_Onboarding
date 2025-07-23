require('dotenv').config();
const chromedriver = require('chromedriver');

module.exports = {
  src_folders: [],
  page_objects_path: [],
  test_settings: {
    default: {
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 9515
      },
      desiredCapabilities: {
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
        browserName: 'chrome',
        'browserstack.debug': true
      }
    }
  }
};

//git hub