<template>
  <div class="footer">
    <div>
      <div class="author">
        <div>©2020</div>
        <template v-for="(item, index) in author">
          <div :key="index">
            <a style="margin-left: 5px" v-if="index > 0">&</a>
            <a
              style="margin-left: 5px"
              :href="item.url || null"
              target="_blank"
              >{{ item.name }}</a
            >
          </div>
        </template>
      </div>
      <div class="not-official">{{ $t("info.notOfficial") }}</div>
      <div class="info">
        <div>
          Created by
          <a href="https://github.com/blacktunes/voices-button-cli"
            >voices-button-cli</a
          >{{ " / "
          }}<a href="https://github.com/vbup-osc/mio-button">mio-button</a>
        </div>
        <template v-for="(item, index) in info">
          <div :key="index" v-html="item"></div>
        </template>
        <a style="margin-left: 0" v-if="github" :href="github">{{
          $t("info.toGithub")
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Setting from '@/../setting/setting.json'

const FOOTER = Setting.footer

export default {
  data() {
    return {
      author: FOOTER.author || [],
      info: FOOTER.info || [],
      github: FOOTER.github || ''
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 15px;
  background-color: rgb(34, 34, 34);
  font-size: 12px;
  color: #333;
  .author {
    display: flex;
    align-items: center;
    color: #c2c2c2;
  }
  .not-official {
    color: #c2c2c2;
  }
  .info {
    line-height: 18px;
    color: #c2c2c2;
  }
}
</style>
