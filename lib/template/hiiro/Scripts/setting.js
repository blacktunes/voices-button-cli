const inquirer = require('inquirer')
const chalk = require('chalk')
const { log } = require('../../../log')

module.exports = async function (header, footer, media, text, cdn) {
  const SETTING_DATA = {
    TITLE_CN: '语音按钮',
    TITLE_EN: 'Voives Button',
    NAME_CN: '',
    NAME_EN: '',
    ICON: '🍣',
    YOUTUBE: '',
    TWITTER: '',
    BILIBILI: '',
    AUTHOR: '',
    AUTHOR_URL: '',
    INFO: '',
    GITHUB: '',
    TEXT: '',
    SIZE: '',
    COLOR: '',
    IMG: '',
    IMG_WIDTH: '',
    IMG_HEIGHT: '',
    MEDIA_SESSION: '',
    CDN: ''
  }

  if (header || footer || media || text) {
    log(`整体设置(${chalk.cyan('/setting/setting.json')}):`)
  }

  if (header) {
    log()
    log('Header设置:')
    const HEADER_DATA = await inquirer.prompt([
      {
        name: 'TITLE_CN',
        type: 'input',
        message: '中文标题:',
        default: SETTING_DATA.TITLE_CN
      },
      {
        name: 'TITLE_EN',
        type: 'input',
        message: '英文标题:',
        default: SETTING_DATA.TITLE_EN
      },
      {
        name: 'ICON',
        type: 'input',
        message: '图标:',
        default: SETTING_DATA.ICON
      },
      {
        name: 'YOUTUBE',
        type: 'input',
        message: 'Youtube链接:'
      },
      {
        name: 'TWITTER',
        type: 'input',
        message: 'Twitter链接:'
      },
      {
        name: 'BILIBILI',
        type: 'input',
        message: 'Bilibili链接:'
      }
    ])
    SETTING_DATA.TITLE_CN = HEADER_DATA.TITLE_CN
    SETTING_DATA.TITLE_EN = HEADER_DATA.TITLE_EN
    SETTING_DATA.ICON = HEADER_DATA.ICON
    SETTING_DATA.YOUTUBE = HEADER_DATA.YOUTUBE
    SETTING_DATA.TWITTER = HEADER_DATA.TWITTER
    SETTING_DATA.BILIBILI = HEADER_DATA.BILIBILI
  }

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

  if (media) {
    log()
    log('MediaSession设置:')
    const MEDIA_DATA = await inquirer.prompt([
      {
        name: 'NAME_CN',
        type: 'input',
        message: 'V中文名:'
      },
      {
        name: 'NAME_EN',
        type: 'input',
        message: 'V日文名:',
        default: data => {
          return data.NAME_CN
        }
      },
      {
        name: 'MEDIA_SESSION',
        type: 'input',
        message: '专辑图片名(请放入public/img文件夹):'
      }
    ])
    SETTING_DATA.NAME_CN = MEDIA_DATA.NAME_CN
    SETTING_DATA.NAME_EN = MEDIA_DATA.NAME_EN
    SETTING_DATA.MEDIA_SESSION = MEDIA_DATA.MEDIA_SESSION
  }

  if (text) {
    log()
    log('Console显示设置:')
    const LOG_DATA = await inquirer.prompt([
      {
        name: 'TEXT',
        type: 'input',
        message: '显示文字:'
      },
      {
        name: 'SIZE',
        type: 'number',
        message: '字体大小(px):',
        default: 20,
        filter: val => {
          return val + 'px'
        },
        when: data => {
          return Boolean(data.TEXT)
        }
      },
      {
        name: 'COLOR',
        type: 'input',
        message: '文字颜色:',
        when: data => {
          return Boolean(data.TEXT)
        }
      },
      {
        name: 'IMG',
        type: 'input',
        message: '显示的图片(请放入public/img文件夹):'
      },
      {
        name: 'IMG_WIDTH',
        type: 'number',
        message: '图片宽度(%):',
        default: 100,
        filter: val => {
          return val + '%'
        },
        when: data => {
          return Boolean(data.IMG)
        }
      },
      {
        name: 'IMG_HEIGHT',
        type: 'number',
        message: '图片高度(%):',
        default: 84,
        filter: val => {
          return val + '%'
        },
        when: data => {
          return Boolean(data.IMG)
        }
      }
    ])
    SETTING_DATA.TEXT = LOG_DATA.TEXT
    SETTING_DATA.SIZE = LOG_DATA.SIZE
    SETTING_DATA.COLOR = LOG_DATA.COLOR
    SETTING_DATA.IMG = LOG_DATA.IMG
    SETTING_DATA.IMG_WIDTH = LOG_DATA.IMG_WIDTH
    SETTING_DATA.IMG_HEIGHT = LOG_DATA.IMG_HEIGHT
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