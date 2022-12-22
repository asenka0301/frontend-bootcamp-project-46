#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
    .description('Compare two configuration files and shows a diffirence.')
    .version('0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    

program.parse();