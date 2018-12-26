// 问题交互
const inquirer = require('inquirer')
module.exports={
  down:()=> {
    return inquirer.prompt([
      {
        name: 'name',
        message: 'Please enter the project name'
      },
      {
        name: 'description',
        message: 'Please enter the project description'
      },
      {
        name: 'author',
        message: 'Please enter the project author'
      },
      {
        type: 'list',
        name: 'cssModule',
        default: 'sass',
        message: 'Please select the css language to use',
        choices: [
          'sass', 'less'
        ]
      },
      {
        type: 'list',
        name: 'template',
        default: 'sass',
        message: 'Please select a project template',
        choices: [
          'default', 'vue', 'react'
        ]
      }
    ])
  },
  ifInstall:()=>{
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'ifInstall',
        message: 'Are you want to install dependence now?',
        default: true
      }
    ])
  },
  Install:()=> {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'installWay',
        message: 'Choose the tool to install',
        choices: [
          'npm', 'yarn'
        ]
      }
    ])
  }
}
