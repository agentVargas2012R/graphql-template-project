require('babel-register');
require('@babel/polyfill/noConflict');

const chalk = require('chalk');

const server = require('../../src/server').default;

module.exports = async () => {

    console.log(chalk.yellow("\nStarting Server....\n"));
    global.httpServer = await server.start({ port: 4000 });
    console.log(chalk.green("\nTest Server Started.....\n"));
}