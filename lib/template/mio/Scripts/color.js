const inquirer = require('inquirer')
const chalk = require('chalk')
const { log } = require('../../../log')

module.exports = async function (check) {
  const COLOR_DATA = {
    BTN_COLOR: '#ff9c9c',
    VOICE_BTN_COLOR: '#ff7c7c',
    CARD_COLOR: 'rgb(255, 125, 125)',
    DARK_CARD_COLOR: 'rgb(78, 78, 78)',
    CONTROL_COLOR: 'rgba(255, 123, 123, 0.76)',
    CONTROL_HOVER_COLOR: 'rgba(255, 123, 123, 0.9)'
  }

  if (check) {
    log()
    log(`颜色设置(${chalk.cyan('/setting/color.styl')}):`)
    log('文字颜色默认为: #FFFFFF')
    log('背景颜色默认为: rgb(78, 78, 78)')
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'BTN_COLOR',
        message: '按钮颜色:',
        default: '#ff9c9c'
      },
      {
        type: 'input',
        name: 'VOICE_BTN_COLOR',
        message: '语音按钮颜色:',
        default: '#ff7c7c'
      },
      {
        type: 'input',
        name: 'CARD_COLOR',
        message: '卡片颜色:',
        default: 'rgb(255, 125, 125)'
      },
      {
        type: 'input',
        name: 'DARK_CARD_COLOR',
        message: '暗色卡片颜色:',
        default: 'rgb(78, 78, 78)'
      },
      {
        type: 'input',
        name: 'CONTROL_COLOR',
        message: '控制栏按钮颜色:',
        default: 'rgba(255, 123, 123, 0.76)'
      },
      {
        type: 'input',
        name: 'CONTROL_HOVER_COLOR',
        message: '控制栏按钮hover颜色:',
        default: 'rgba(255, 123, 123, 0.9)'
      }
    ])
    COLOR_DATA.BTN_COLOR = input.BTN_COLOR
    COLOR_DATA.VOICE_BTN_COLOR = input.VOICE_BTN_COLOR
    COLOR_DATA.CARD_COLOR = input.CARD_COLOR
    COLOR_DATA.DARK_CARD_COLOR = input.DARK_CARD_COLOR
    COLOR_DATA.CONTROL_COLOR = input.CONTROL_COLOR
    COLOR_DATA.CONTROL_HOVER_COLOR = input.CONTROL_HOVER_COLOR
  }

  return COLOR_DATA
}
