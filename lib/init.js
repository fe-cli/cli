const fs = require('fs');
const path = require('path')
const program = require('commander');
const chalk = require('chalk').constructor({ enabled: true })
var download = require('download-git-repo')
// 问题交互
const Prompt = require('./downInteraction')
// 填充信息至文件
const handlebars = require('handlebars')
// 显示提示图标
const symbols = require('log-symbols')
// 命令行操作
var shell = require("shelljs")
// 动画效果
const ora = require('ora')
const tplJson = require('./template').downTemp
const option=program.parse(process.argv).args[2]
module.exports = function(name) {
  if (!fs.existsSync(name)) {
    Prompt.down().then((answers) => {
      const spinner = ora('Downloading...');
      const temUrl=tplJson(answers.template)['url'];
      spinner.start();
      download(`${temUrl}`,name, { clone: true },function(err){
        if (err) {
          spinner.fail();
          console.log(symbols.error, chalk.red(err));
        } else {
          spinner.succeed();
          const fileName = path.resolve(`${name}/package.json`);
          const meta = {
            name:answers.name || name,
            description: answers.description,
            cssModule: answers.cssModule=='less'?'less':false,
            author: answers.author
          }
          if (fs.existsSync(fileName)) {
            const content = fs.readFileSync(fileName).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(fileName, result);
          }
          console.log(symbols.success, chalk.green('The vue object has downloaded successfully!'));
          Prompt.ifInstall().then((answers) => {
            if (answers.ifInstall) {
              Prompt.Install().then(ans => {
                if (ans.installWay === 'npm') {
                  let spinner = ora('Installing...');
                  spinner.start();
                  // 命令行操作安装依赖
                  shell.exec("cd " + name + " && npm i", function (err, stdout, stderr) {
                    if (err) {
                      spinner.fail();
                      console.log(symbols.error, chalk.red(err));
                    }
                    else {
                      spinner.succeed();
                      console.log(symbols.success, chalk.green('The object has installed dependence successfully!'));
                    }
                  });
                } else {
                  let spinner = ora('Installing...');
                  spinner.start();
                  shell.exec("cd " + name + " && yarn add", function (err, stdout, stderr) {
                    if (err) {
                      spinner.fail();
                      console.log(symbols.error, chalk.red(err));
                    }
                    else {
                      spinner.succeed();
                      console.log(symbols.success, chalk.green('The object has installed dependence successfully!'));
                    }
                  })
                }
              })
            } else {
              console.log(symbols.success, chalk.green('You should install the dependence by yourself!'));
            }
          })
        }
      })
    })
  }else{
    console.log(symbols.error, chalk.red(`当前目录已存在${name}文件`));
  }
}
