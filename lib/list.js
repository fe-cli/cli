const tplJson = require('./template').list
const chalk = require('chalk').constructor({ enabled: true })
const symbols = require('log-symbols')
module.exports=function(){
  Object.keys(tplJson).forEach((item) => {
    let tplData = tplJson[item];
    console.log(symbols.info +
      chalk.yellow('★') +
      '  ' + chalk.yellow(tplData.name) +
      ' - ' + tplData.description +
      ' - ' + chalk.red(`模板安装包${tplData.url}`));
  })
}
