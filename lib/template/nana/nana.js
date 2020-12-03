const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const { clearConsole, log, done } = require('../../log')

module.exports = async function create(name, targetDir) {
  const { checkbox } = await inquirer.prompt([{
    type: 'checkbox',
    message: '请选择想要设置的配置:',
    name: 'checkbox',
    choices: [
      {
        name: 'index.html',
        value: 'index',
        checked: true
      },
      {
        name: '颜色',
        value: 'color',
        checked: true
      },
      {
        name: 'Header',
        value: 'header',
        checked: true
      },
      {
        name: 'Footer',
        value: 'footer',
        checked: true
      },
      {
        name: 'MediaSession',
        value: 'media'
      },
      {
        name: '控制台输出',
        value: 'console'
      },
      {
        name: 'GA统计',
        value: 'ga'
      },
      {
        name: 'PWA',
        value: 'pwa'
      }
    ]
  }])

  const html = await require('./html')(checkbox.includes('index'), name)
  const color = await require('./color')(checkbox.includes('color'))
  const setting = await require('./setting')(checkbox.includes('header'), checkbox.includes('footer'), checkbox.includes('media'), checkbox.includes('console'), checkbox.includes('ga'))
  const config = await require('./config')(checkbox.includes('pwa'))
  const package = await require('./package')(name, checkbox.includes('pwa'))

  clearConsole(chalk.cyan('Voices Button CLI'))
  log('模板复制中...')
  fs.ensureDirSync(targetDir)
  fs.copySync(path.resolve(__dirname, './vue'), targetDir)
  clearConsole(chalk.cyan('Voices Button CLI'))

  fs.writeFileSync(path.join(targetDir, '/public/index.html'), html)

  fs.writeFileSync(path.join(targetDir, '/src/setting/color.styl'), color)

  fs.writeFileSync(path.join(targetDir, '/src/setting/setting.json'), setting)

  fs.writeFileSync(path.join(targetDir, '/vue.config.js'), config)

  fs.writeFileSync(path.join(targetDir, '/package.json'), package)

  await require('./main')(checkbox.includes('ga'), checkbox.includes('pwa'), targetDir)

  done(`好耶~ ${chalk.yellow(name)}已创建~`)
  log()
  try {
    const data = JSON.parse(setting)
    if (data.console.img) {
      log(`请把${chalk.cyan(data.console.img)}放入${chalk.cyan('public')}目录`, 'TIPS')
    }
    if (data.mediaSession) {
      log(`请把${chalk.cyan(data.mediaSession)}放入${chalk.cyan('public')}目录`, 'TIPS')
    }
  } catch { }
}
