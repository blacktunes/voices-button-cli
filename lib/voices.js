const fs = require('fs-extra')
const path = require('path')
const { info, warn, done } = require('./log')
const chalk = require('chalk')

module.exports = async function create(cwd) {
  warn('该功能生成的翻译文件不适用于最新模板')
  let list = {
    category: [],
    voices: []
  }
  const uri = path.resolve(cwd, './public/voices')
  const dataList = fs.readdirSync(uri)
  dataList.forEach(name => {
    if (!fs.lstatSync(uri + '/' + name).isDirectory()) {
      const haveCategory = list.category.some(item => {
        return item.name === 'voice'
      })
      const haveVoice = list.voices.some(item => {
        return item.path === name
      })
      if (!haveVoice && !haveCategory) {
        list.category.push({
          "name": "voice",
          "translate": {
            "zh-CN": "语音",
            "ja-JP": "音声"
          }
        })
      }
      if (!haveVoice) {
        const title = name.substring(0, name.indexOf('.'))
        list.voices.push({
          "name": title,
          "path": name,
          "date": new Date().toLocaleDateString(),
          "translate": {
            "zh-CN": title,
            "ja-JP": title
          },
          "category": "voice"
        })
      }
    } else {
      if (name !== 'img') {
        list.category.push({
          "name": name,
          "translate": {
            "zh-CN": name,
            "ja-JP": name
          }
        })
        const voiceList = fs.readdirSync(uri + '/' + name)
        voiceList.forEach(voice => {
          if (!fs.lstatSync(uri + '/' + name + '/' + voice).isDirectory()) {
            const index = list.voices.findIndex(item => {
              item.path === voice
            })
            if (index === -1) {
              const title = voice.substring(0, voice.indexOf('.'))
              list.voices.push({
                "name": title,
                "path": voice,
                "date": new Date().toLocaleDateString(),
                "translate": {
                  "zh-CN": title,
                  "ja-JP": title
                },
                "category": name
              })
            } else {
              list.voices[index].category = name
            }
            fs.renameSync(uri + '/' + name + '/' + voice, uri + '/' + voice)
          }
        })
        if (fs.readdirSync(uri + '/' + name).length === 0) {
          fs.rmdirSync(uri + '/' + name)
        }
      }
    }
  })
  if (fs.existsSync(path.resolve(cwd, './voices.json'))) {
    fs.renameSync(path.resolve(cwd, './voices.json'), path.resolve(cwd, `./voices_${Date.now()}.json`))
  }
  fs.writeJSONSync(path.resolve(cwd, './voices.json'), list, {
    spaces: 2
  })
  info(`语音分类: ${list.category.length}`)
  info(`语音数: ${list.voices.length}`)
  done(`${chalk.cyan('voices.json')}已生成`)
}
