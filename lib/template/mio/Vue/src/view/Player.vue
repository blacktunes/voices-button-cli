<template>
  <div>
    <div v-if="playSetting.nowPlay.name" class="status">
      {{ $t("action.playing") + $t("voice." + playSetting.nowPlay.name) }}
    </div>
    <div
      v-for="category in voices"
      :key="category.categoryName"
      :id="category.categoryName"
    >
      <Card class="category" :dark="true">
        <template #header>
          {{ $t("voicecategory." + category.categoryName) }}
        </template>
        <Button
          v-for="voiceItem in category.voiceList"
          :voice="true"
          :key="voiceItem.name"
          :value="$t('voice.' + voiceItem.name)"
          @click.native="play(voiceItem, category.categoryName)"
        />
      </Card>
    </div>
    <Control>
      <div @click="stopPlay">
        <img src="@/assets/images/stop.svg" />
      </div>
      <div @click="randomPlay">
        <img src="@/assets/images/choose.svg" />
      </div>
      <div @click="changeOverlap" :class="{ selected: playSetting.overlap }">
        <img src="@/assets/images/over.svg" />
      </div>
      <div
        @click="changeAutoRandom"
        :class="{ selected: playSetting.autoRandom }"
      >
        <img src="@/assets/images/auto.svg" />
      </div>
    </Control>
  </div>
</template>

<script>
import VoiceList from '@/../setting/voices.json'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Control from '../components/Control'
import Setting from '@/../setting/setting.json'

const CDN = Setting['CDN']

export default {
  components: {
    Card,
    Button,
    Control
  },
  data() {
    return {
      playSetting: {
        nowPlay: {},
        overlap: false,
        autoRandom: false
      },
      playerList: new Map(),
      voices: VoiceList.voices
    }
  },
  methods: {
    play(voice, category) {
      // GA的事件上报位置
      if (!this.playSetting.overlap) {
        if (this.playerList.has('once')) {
          this.playerList.get('once').audio.pause()
        }
        this.addPlayer(voice, 'once')
      } else {
        const key = new Date().getTime()
        this.addPlayer(voice, key)
      }
    },
    addPlayer(voice, key) {
      this.playSetting.nowPlay = {}
      if (key === 'once' && this.playerList.has(key)) {
        this.playerList.get(key).audio.oncanplay = null
      }
      const path = process.env.NODE_ENV === 'production' && CDN ? `${CDN}/${voice.path}` : `voices/${voice.path}`
      this.playerList.set(key, {
        name: voice.name,
        audio: new Audio(path)
      })
      this.playSetting.nowPlay = voice
      this.playerList.get(key).audio.play()
      this.playerList.get(key).audio.onerror = () => {
        if (CDN && this.playerList.get(key).audio.src.startsWith(CDN)) {
          this.playerList.get(key).audio.src = `voices/${voice.path}`
          this.playerList.get(key).audio.play()
        }
      }
      this.playerList.get(key).audio.oncanplay = () => {
        this.playerList.get(key).audio.onended = () => {
          this.playSetting.nowPlay = {}
          this.playerList.delete(key)
          if (this.playSetting.autoRandom) {
            this.randomPlay()
          }
        }
      }
    },
    randomPlay() {
      const tempList = this.voices[this._getrRandomInt(this.voices.length - 1)]
      this.play(tempList.voiceList[this._getrRandomInt(tempList.voiceList.length - 1)])
    },
    stopPlay() {
      for (const key of this.playerList.keys()) {
        this.playerList.get(key).audio.pause()
        this.playerList.get(key).audio.onerror = null
        this.playerList.get(key).audio.oncanplay = null
        this.playerList.get(key).audio.onended = null
      }
      this.playerList.clear()
      this.playSetting.nowPlay = {}
    },
    changeOverlap() {
      this.playSetting.autoRandom = false
      this.playSetting.overlap = !this.playSetting.overlap
    },
    changeAutoRandom() {
      this.playSetting.overlap = false
      this.playSetting.autoRandom = !this.playSetting.autoRandom
    },
    _getrRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  position: fixed;
  top: 10px;
  left: 30px;
  padding: 5px 20px;
  background: #585858;
  border-radius: 150px;
  color: #fff;
  box-shadow: 0 10px 10px 0px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.selected {
  background: #4e4e4e !important;
}
</style>
