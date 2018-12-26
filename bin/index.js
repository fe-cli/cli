#!/usr/bin/env node
const program = require('commander');
const list = require('../lib/list')
const init = require('../lib/init')
program.version(require('../package').version, '-v, --version')
    .option('-l', '显示所有模板')
    .option('-i', '初始化项目结构')
    .usage('<command> [options]');


program
  .command('list')
  .alias('-l')
  .description('显示所有模板')
  .action(list);

program
  .command('init <name>')
  .description('下载模版')
  .action(init);
program.parse(process.argv);

