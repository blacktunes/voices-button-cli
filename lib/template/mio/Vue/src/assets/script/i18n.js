import Vue from 'vue'
import VueI18n from 'vue-i18n'

import CN from '@/../setting/locales/zh-CN'
import JP from '@/../setting/locales/ja-JP'
import US from '@/../setting/locales/en-US'
import VoiceList from '@/../setting/voices.json'
import Setting from '@/../setting/setting.json'

Vue.use(VueI18n)

const TITLE = Setting.title

// 提取标签到语言文件
const CN_VOICE = { voice: {}, voicecategory: {} }
const JP_VOICE = { voice: {}, voicecategory: {} }
const US_VOICE = { voice: {}, voicecategory: {} }

for (const voiceCategoryList of VoiceList.voices) {
  if (voiceCategoryList.categoryDescription !== undefined) {
    if (voiceCategoryList.categoryDescription['zh-CN'] !== undefined) {
      CN_VOICE.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['zh-CN']
    }
    if (voiceCategoryList.categoryDescription['ja-JP'] !== undefined) {
      JP_VOICE.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['ja-JP']
    }
    if (voiceCategoryList.categoryDescription['en-US'] !== undefined) {
      US_VOICE.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['en-US']
    }
  }
  for (const voiceItem of voiceCategoryList.voiceList) {
    if (voiceItem.description !== undefined) {
      if (voiceItem.description['zh-CN'] !== undefined) {
        CN_VOICE.voice[voiceItem.name] = voiceItem.description['zh-CN']
      }
      if (voiceItem.description['ja-JP'] !== undefined) {
        JP_VOICE.voice[voiceItem.name] = voiceItem.description['ja-JP']
      }
      if (voiceItem.description['en-US'] !== undefined) {
        US_VOICE.voice[voiceItem.name] = voiceItem.description['en-US']
      }
    }
  }
}

const CN_LIST = Object.assign(CN, CN_VOICE)
const JP_LIST = Object.assign(JP, JP_VOICE)
const US_LIST = Object.assign(US, US_VOICE)

CN_LIST.info.title = TITLE.CN || '语音按钮'
JP_LIST.info.title = TITLE.JP || '语音按钮'
US_LIST.info.title = TITLE.US || '语音按钮'

const messages = {
  'zh-CN': CN_LIST,
  'ja-JP': JP_LIST,
  'en-US': US_LIST
}

let locale = 'zh-CN'
if (/ja/i.test(navigator.language)) {
  locale = 'ja-JP'
} else if (/en/i.test(navigator.language)) {
  locale = 'en-US'
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n
