const inquirer = require('inquirer')
const chalk = require('chalk')
const { log } = require('../../../log')

module.exports = async function (footer, cdn) {
  const SETTING_DATA = {
    TITLE_CN: '语音按钮',
    TITLE_JP: '音声ボタン',
    TITLE_US: 'Voives Button',
    AUTHOR: '',
    AUTHOR_URL: '',
    INFO: '',
    GITHUB: '',
    CDN: ''
  }

  log(`整体设置(${chalk.cyan('/setting/setting.json')}):`)

  log()
  log('标题设置:')
  const HEADER_DATA = await inquirer.prompt([
    {
      name: 'TITLE_CN',
      type: 'input',
      message: '中文标题:',
      default: SETTING_DATA.TITLE_CN
    },
    {
      name: 'TITLE_JP',
      type: 'input',
      message: '日文标题:',
      default: SETTING_DATA.TITLE_JP
    },
    {
      name: 'TITLE_US',
      type: 'input',
      message: '英文标题:',
      default: SETTING_DATA.TITLE_US
    }
  ])
  SETTING_DATA.TITLE_CN = HEADER_DATA.TITLE_CN
  SETTING_DATA.TITLE_JP = HEADER_DATA.TITLE_JP
  SETTING_DATA.TITLE_US = HEADER_DATA.TITLE_US

  if (footer) {
    log()
    log('Footer设置:')
    const FOOTER_DATA = await inquirer.prompt([
      {
        name: 'AUTHOR',
        type: 'input',
        message: '作者:'
      },
      {
        name: 'AUTHOR_URL',
        type: 'input',
        message: '作者域名:',
        when: data => {
          return Boolean(data.AUTHOR)
        }
      },
      {
        name: 'INFO',
        type: 'input',
        message: '页脚介绍:'
      },
      {
        name: 'GITHUB',
        type: 'input',
        message: 'Github链接:',
      }
    ])
    SETTING_DATA.AUTHOR = FOOTER_DATA.AUTHOR
    SETTING_DATA.AUTHOR_URL = FOOTER_DATA.AUTHOR_URL
    SETTING_DATA.INFO = FOOTER_DATA.INFO
    SETTING_DATA.GITHUB = FOOTER_DATA.GITHUB
  }

  if (cdn) {
    const { CDN } = await inquirer.prompt([
      {
        name: 'CDN',
        type: 'input',
        message: 'CDN地址:'
      }
    ])
    SETTING_DATA.CDN = CDN
  }

  return SETTING_DATA
}