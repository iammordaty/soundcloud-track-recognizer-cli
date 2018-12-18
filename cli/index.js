#!/usr/bin/env node

'use strict';

const program = require('commander');
const escapeStringRegexp = require('escape-string-regexp');

const { DEFAULT_CLI_CONFIG_PATH, loadConfig, printResults, recognize } = require('./cli.js');
const { version, description } = require('../package.json');

program
    .version(version)
    .option('-C, --config-path [path]', `Sets path to config file. Defaults to "${DEFAULT_CLI_CONFIG_PATH}".`);

program
    .command('recognize')
    .alias('r')
    .description(description)
    .arguments('<username>')
    .option('-f, --filter <string|regex>', 'Limit processed comments to the given pattern or string')
    .option('-l, --limit <n>', 'Limits the number of fetched comments the <n> most recent ones')
    .action((username, { limit, filter, parent }) => {
        const { configPath } = parent;
        const config = loadConfig(configPath || DEFAULT_CLI_CONFIG_PATH);

        const comment_filter = filter
            ? new RegExp(escapeStringRegexp(filter), 'i')
            : undefined;

        const params = {
            limit,
            username,
            comment_filter
        };

        recognize(config, params).then(results => printResults(results));
    });

program.parse(process.argv);
