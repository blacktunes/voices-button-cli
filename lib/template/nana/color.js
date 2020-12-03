const inquirer = require('inquirer')
const { log } = require('../../log')

module.exports = async function (check) {
  let mainColor = '#c4afd0'
  let subColor = '#788ca0'
  let btnTextColor = '#ffffff'
  let titleColor = '#c4afd0'
  let hoverColor = '#bbc5cf'
  let activeColor = '#93a3b3'

  if (check) {
    log()
    log('颜色设置(不建议使用透明色):')
    const colorData = await inquirer.prompt([
      {
        type: 'input',
        name: 'mainColor',
        message: '主颜色:',
        default: '#c4afd0'
      },
      {
        type: 'input',
        name: 'subColor',
        message: '副颜色:',
        default: '#788ca0'
      },
      {
        type: 'input',
        name: 'btnTextColor',
        message: '按钮文字颜色:',
        default: '#ffffff'
      },
      {
        type: 'input',
        name: 'titleColor',
        message: '控制栏文字颜色:',
        default: '#c4afd0'
      },
      {
        type: 'input',
        name: 'hoverColor',
        message: '按钮hover颜色:',
        default: '#bbc5cf'
      },
      {
        type: 'input',
        name: 'activeColor',
        message: '按钮active颜色:',
        default: '#93a3b3'
      }
    ])
    mainColor = colorData.mainColor
    subColor = colorData.subColor
    btnTextColor = colorData.btnTextColor
    titleColor = colorData.titleColor
    hoverColor = colorData.hoverColor
    activeColor = colorData.activeColor
  }

  return `$main-color = ${mainColor}
$sub-color = ${subColor}
$btn-text-color = ${btnTextColor}
$title-color = ${titleColor}
$hover-color = ${hoverColor}
$active-color = ${activeColor}`
}
