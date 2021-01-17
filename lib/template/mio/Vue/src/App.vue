<template>
  <div id="app">
    <Select ref="Select" class="select">
      <template #icon>
        <img src="@/assets/images/lang.svg" />
      </template>
      <div>
        <img
          src="@/assets/images/China.jpg"
          width="100%"
          @click="changeLang('zh-CN')"
        />
      </div>
      <div>
        <img
          src="@/assets/images/Japan.jpg"
          width="100%"
          @click="changeLang('ja-JP')"
        />
      </div>
      <div>
        <img
          src="@/assets/images/England.jpg"
          width="100%"
          @click="changeLang('en-US')"
        />
      </div>
    </Select>
    <Header />
    <Collaborate />
    <Category />
    <Player />
    <Footer />
  </div>
</template>

<script>
import Select from './components/Select'
import Header from './view/Header'
import Collaborate from './view/Collaborate'
import Category from './view/Category'
import Player from './view/Player'
import Footer from './view/Footer'

export default {
  components: {
    Select,
    Collaborate,
    Category,
    Player,
    Header,
    Footer
  },
  methods: {
    changeLang(v) {
      this.$i18n.locale = v
      localStorage.setItem('lang', v)
      this.$refs.Select.showItem()
    }
  },
  created() {
    console.log('Produced by Voice Button United Studio')
    this.$i18n.locale = localStorage.getItem('lang') || this.$i18n.locale
  }
}
</script>

<style lang="scss">
body {
  background: rgb(78, 78, 78);
  margin: 0;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}

a {
  color: #337ab7;
  text-decoration: none;
}
</style>
