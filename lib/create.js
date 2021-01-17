const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { clearConsole, log } = require('./log')
const validateProjectName = require('validate-npm-package-name')

module.exports = async function create(projectName, cwd) {
  clearConsole(chalk.cyan('Voices Button CLI'))
  const inCurrent = projectName === '.'
  const targetDir = path.resolve(cwd, projectName || '.')
  const name = inCurrent ? path.relative('../', cwd) : projectName

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    return
  }

  if (fs.existsSync(targetDir)) {
    if (inCurrent) {
      const { ok } = await inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `Generate project in current directory?`
        }
      ])
      if (!ok) {
        return
      }
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
          choices: [
            { name: 'Merge', value: 'merge' },
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false }
          ]
        }
      ])
      if (!action) {
        return
      } else if (action === 'overwrite') {
        log(`\nRemoving ${chalk.cyan(targetDir)}...`)
        fs.emptyDirSync(targetDir)
        clearConsole(chalk.cyan('Voices Button CLI'))
      }
    }
  }

  const { templateName } = await inquirer.prompt([
    {
      name: 'templateName',
      type: 'list',
      message: '选择一个模板:',
      choices: [
        { name: 'Hiiro按钮(Vue3.x, typescript, stylus)', value: 'hiiro' },
        { name: '狼按钮(Vue2.6, scss)', value: 'mio' }
      ]
    }
  ])
  if (templateName === 'hiiro') {
    await require('./template/hiiro')(name, targetDir)
  } else if (templateName === 'mio') {
    await require('./template/mio')(name, targetDir)
  }
}
