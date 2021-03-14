const inquirer = require('inquirer')
const chalk = require('chalk')
const { log } = require('../../../log')

module.exports = async function (check) {
  let COLOR_DATA = {
    MAIN_COLOR: '#F5C1BB',
    MAIN_COLOR_DARK: 'rgba(245,193,187,0.9)',
    SUB_COLOR: '#F5F0F2',
    SUB_COLOR_DARK: 'rgba(245, 240, 242,0.9)',
    BTN_TEXT_COLOR: '#5F505F',
    TITLE_COLOR: '#5F505F',
    TITLE_COLOR_DARK: '#999999',
    HOVER_COLOR: '#bbc5cf',
    ACTIVE_COLOR: '#93a3b3'
  }

  if (check) {
    log()
    log(`颜色设置(${chalk.cyan('/setting/color.styl')}):`)
    log('不建议使用透明色')
    const COLOR_INPUT = await inquirer.prompt([
      {
        type: 'input',
        name: 'MAIN_COLOR',
        message: '主颜色:',
        default: COLOR_DATA.MAIN_COLOR
      },
      {
        type: 'input',
        name: 'MAIN_COLOR_DARK',
        message: '暗色模式主颜色:',
        default: COLOR_DATA.MAIN_COLOR_DARK
      },
      {
        type: 'input',
        name: 'SUB_COLOR',
        message: '副颜色:',
        default: COLOR_DATA.SUB_COLOR
      },
      {
        type: 'input',
        name: 'SUB_COLOR_DARK',
        message: '暗色模式副颜色:',
        default: COLOR_DATA.SUB_COLOR_DARK
      },
      {
        type: 'input',
        name: 'BTN_TEXT_COLOR',
        message: '按钮文字颜色:',
        default: COLOR_DATA.BTN_TEXT_COLOR
      },
      {
        type: 'input',
        name: 'TITLE_COLOR_DARK',
        message: '暗色模式文字颜色:',
        default: COLOR_DATA.TITLE_COLOR_DARK
      },
      {
        type: 'input',
        name: 'TITLE_COLOR',
        message: '控制栏文字颜色:',
        default: COLOR_DATA.TITLE_COLOR
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
    COLOR_DATA = { ...COLOR_DATA, ...COLOR_INPUT }
  }

  return COLOR_DATA
}
