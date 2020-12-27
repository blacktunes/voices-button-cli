const inquirer = require('inquirer')
const chalk = require('chalk')
const { log } = require('../../../log')

module.exports = async function (check) {
  const COLOR_DATA = {
    MAIN_COLOR: '#F5C1BB',
    SUB_COLOR: '#F5F0F2',
    BTN_TEXT_COLOR: '#5F505F',
    TITLE_COLOR: '#5F505F',
    HOVER_COLOR: '#bbc5cf',
    ACTIVE_COLOR: '#93a3b3'
  }

  if (check) {
    log()
    log(`颜色设置(${chalk.cyan('/setting/color.styl')}):`)
    log('不建议使用透明色')
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'MAIN_COLOR',
        message: '主颜色:',
        default: '#F5C1BB'
      },
      {
        type: 'input',
        name: 'SUB_COLOR',
        message: '副颜色:',
        default: '#F5F0F2'
      },
      {
        type: 'input',
        name: 'BTN_TEXT_COLOR',
        message: '按钮文字颜色:',
        default: '#5F505F'
      },
      {
        type: 'input',
        name: 'TITLE_COLOR',
        message: '控制栏文字颜色:',
        default: '#5F505F'
      },
      {
        type: 'input',
        name: 'HOVER_COLOR',
        message: '按钮hover颜色:',
        default: '#bbc5cf'
      },
      {
        type: 'input',
        name: 'ACTIVE_COLOR',
        message: '按钮active颜色:',
        default: '#93a3b3'
      }
    ])
    COLOR_DATA.MAIN_COLOR = input.MAIN_COLOR
    COLOR_DATA.SUB_COLOR = input.SUB_COLOR
    COLOR_DATA.BTN_TEXT_COLOR = input.BTN_TEXT_COLOR
    COLOR_DATA.TITLE_COLOR = input.TITLE_COLOR
    COLOR_DATA.HOVER_COLOR = input.HOVER_COLOR
    COLOR_DATA.ACTIVE_COLOR = input.ACTIVE_COLOR
  }

  return COLOR_DATA
}
