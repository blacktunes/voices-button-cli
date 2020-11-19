const fs = require('fs-extra')
const path = require('path')

module.exports = async function (ga, pwa, targetDir) {
  const main = `import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import VoiceList from '@/setting/translate/voices.json'
import Locales from '@/setting/translate/locales.json'

import Setting from './setting/setting.json'
import './assets/style/transition.styl'${pwa ? `\nimport './registerServiceWorker'` : ''}${ga ? `\n\nimport { gtag } from './assets/script/gtag.js'

if (process.env.NODE_ENV === 'production' && (Setting as any).GA_ID) {
  window.dataLayer = window.dataLayer || []
  gtag('js', new Date())
  gtag('config', (Setting as any).GA_ID)
}` : ''}

const CN: any = { ...Locales['zh-CN'], voice: {}, voicecategory: {} }
const JP: any = { ...Locales['ja-JP'], voice: {}, voicecategory: {} }

CN.info = {
  ...CN.info,
  ...Setting.name.CN
}

JP.info = {
  ...JP.info,
  ...Setting.name.JP
}

for (const category of VoiceList.category) {
  if (category.translate !== undefined) {
    if (category.translate['zh-CN'] !== undefined) {
      CN.voicecategory[category.name] = category.translate['zh-CN']
    }
    if (category.translate['ja-JP'] !== undefined) {
      JP.voicecategory[category.name] = category.translate['ja-JP']
    }
  }
}

for (const voice of VoiceList.voices) {
  if (voice.translate !== undefined) {
    if (voice.translate['zh-CN'] !== undefined) {
      CN.voice[voice.name] = voice.translate['zh-CN']
    }
    if (voice.translate['ja-JP'] !== undefined) {
      JP.voice[voice.name] = voice.translate['ja-JP']
    }
  }
}

CN.voiceTotal = Object.keys(CN.voice).length.toString()
JP.voiceTotal = Object.keys(JP.voice).length.toString()

const i18n = createI18n({
  locale: /ja/i.test(navigator.language) ? 'ja-JP' : 'zh-CN',
  messages: {
    'zh-CN': CN,
    'ja-JP': JP
  }
})

createApp(App).use(router).use(i18n).mount('#app')
`
  if (ga) {
    fs.copyFileSync(path.resolve(__dirname, './registerServiceWorker.js'), path.resolve(targetDir, './src/registerServiceWorker.js'))
    fs.copyFileSync(path.resolve(__dirname, './gtag.js'), path.resolve(targetDir, './src/assets/script/gtag.js'))
    fs.copyFileSync(path.resolve(__dirname, './Voice-ga.vue'), path.resolve(targetDir, './src/components/Voice.vue'))
  } else {
    fs.copyFileSync(path.resolve(__dirname, './Voice.vue'), path.resolve(targetDir, './src/components/Voice.vue'))
  }
  fs.writeFileSync(path.join(targetDir, '/src/main.ts'), main)
}
