require('babel-register')
require('@babel/polyfill/noConflict')
const chalk = require('chalk');
const server = require('../../src/server').default;

module.exports = async () => {
    await global.httpServer.close();
    console.log(chalk.red("\nServer stopped\n"));
    //console.log("NOT STOPPED");
}