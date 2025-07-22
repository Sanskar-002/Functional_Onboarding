require('dotenv').config();
const chromedriver = require('chromedriver');

module.exports = {
    src_folders: ['tests'],
    page_objects_path: ['pages'],
    test_settings: {
        default: {
            webdriver: {
                start_process: true,
                server_path: chromedriver.path,
                port: 4444,
                cli_args: ['--port=4444']
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