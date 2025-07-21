const { BeforeAll, AfterAll, setDefaultTimeout } = require("cucumber");
const { startWebDriver, createSession, closeSession, stopWebDriver } = require("nightwatch-api");

setDefaultTimeout(10000); //1 minute default timeout 

BeforeAll( async() => {
    await startWebDriver();
    // await startWebDriver({
    await createSession();
    });

AfterAll( async() => {
    await closeSession();
    await stopWebDriver();
    // await closeWebDriver({
    });