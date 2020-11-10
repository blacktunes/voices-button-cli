const inquirer = require('inquirer')
const { log } = require('../../log')

module.exports = async function (header, footer, media, logText, ga) {
  let cnTitle = '语音按钮'
  let jpTitle = 'Voives Button'
  let cnName = ''
  let jpName = ''
  let icon = '🌶️'
  let youtube = ''
  let twitter = ''
  let bilibili = ''
  let author = ''
  let authorUrl = ''
  let info = ''
  let gh = ''
  let text = ''
  let size = ''
  let color = ''
  let img = ''
  let imgWidth = ''
  let imgHeight = ''
  let mediaSession = ''
  let GA_ID = ''

  if (header) {
    log()
    log('Header设置:')
    const headerData = await inquirer.prompt([
      {
        name: 'cnTitle',
        type: 'input',
        message: '中文标题:',
        default: cnTitle
      },
      {
        name: 'jpTitle',
        type: 'input',
        message: '日文标题:',
        default: jpTitle
      },
      {
        name: 'icon',
        type: 'input',
        message: '图标:',
        default: icon
      },
      {
        name: 'youtube',
        type: 'input',
        message: 'youtube链接:',
        default: youtube
      },
      {
        name: 'twitter',
        type: 'input',
        message: 'twitter链接:',
        default: twitter
      },
      {
        name: 'bilibili',
        type: 'input',
        message: 'bilibili链接:',
        default: bilibili
      }
    ])
    cnTitle = headerData.cnTitle
    jpTitle = headerData.jpTitle
    icon = headerData.icon
    youtube = headerData.youtube
    twitter = headerData.twitter
    bilibili = headerData.bilibili
  }

  if (footer) {
    log()
    log('Footer设置:')
    const footerData = await inquirer.prompt([
      {
        name: 'author',
        type: 'input',
        message: '作者:',
        default: author
      },
      {
        name: 'authorUrl',
        type: 'input',
        message: '作者域名:',
        default: authorUrl,
        when: function (data) {
          return Boolean(data.author)
        }
      },
      {
        name: 'info',
        type: 'input',
        message: '页脚介绍:',
        default: info
      },
      {
        name: 'github',
        type: 'input',
        message: 'github链接:',
        default: gh
      }
    ])
    author = footerData.author
    authorUrl = footerData.authorUrl
    info = footerData.info
    github = footerData.github
  }

  if (media) {
    log()
    log('MediaSession设置:')
    const mediaData = await inquirer.prompt([
      {
        name: 'cnName',
        type: 'input',
        message: 'V中文名:',
        default: cnName
      },
      {
        name: 'jpName',
        type: 'input',
        message: 'V日文名:',
        default: function (data) {
          return data.cnName
        }
      },
      {
        name: 'mediaSession',
        type: 'input',
        message: '专辑图片名(请放入public/img文件夹):',
        default: mediaSession
      }
    ])
    cnName = mediaData.cnName
    jpName = mediaData.jpName
    mediaSession = mediaData.mediaSession
  }

  if (logText) {
    log()
    log('Console显示设置:')
    const logData = await inquirer.prompt([
      {
        name: 'text',
        type: 'input',
        message: '显示文字:',
        default: text
      },
      {
        name: 'size',
        type: 'number',
        message: '字体大小(px):',
        default: 20,
        filter: function (val) {
          return val + 'px'
        },
        when: function (data) {
          return Boolean(data.text)
        }
      },
      {
        name: 'color',
        type: 'input',
        message: '文字颜色:',
        default: color,
        when: function (data) {
          return Boolean(data.text)
        }
      },
      {
        name: 'img',
        type: 'input',
        message: '显示的图片(请放入public/img文件夹):',
        default: img
      },
      {
        name: 'imgWidth',
        type: 'number',
        message: '图片宽度(%):',
        default: 100,
        filter: function (val) {
          return val + '%'
        },
        when: function (data) {
          return Boolean(data.img)
        }
      },
      {
        name: 'imgHeight',
        type: 'number',
        message: '图片高度(%):',
        default: 84,
        filter: function (val) {
          return val + '%'
        },
        when: function (data) {
          return Boolean(data.img)
        }
      }
    ])
    text = logData.text
    size = logData.size
    color = logData.color
    img = logData.img
    imgWidth = logData.imgWidth
    imgHeight = logData.imgHeight
  }

  if (ga) {
    log()
    log('GA设置:')
    const { ga } = await inquirer.prompt([
      {
        name: 'ga',
        type: 'input',
        message: 'ID:',
        default: ''
      }
    ])
    GA_ID = ga
  }

  return `{
  "name": {
    "CN": {
      "title": "${cnTitle}",
      "fullName": "${cnName}"
    },
    "JP": {
      "title": "${jpTitle}",
      "fullName": "${jpName}"
    }
  },
  "header": {
    "icon": "${icon}",
    "youtube": "${youtube}",
    "twitter": "${twitter}",
    "bilibili": "${bilibili}"
  },
  "footer": {
    "author": [
      {
        "name": "${author}",
        "url": "${authorUrl}"
      }
    ],
    "info": [
      "${info}"
    ],
    "githubUrl": "${gh}"
  },
  "console": {
    "text": "${text}",
    "size": "${size}",
    "color": "${color}",
    "img": "${img}",
    "imgWidth": "${imgWidth}",
    "imgHeight": "${imgHeight}"
  },
  "mediaSession": "${mediaSession}",
  "GA_ID": "${GA_ID}"
}`
}