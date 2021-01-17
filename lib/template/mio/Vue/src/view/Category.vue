<template>
  <Card>
    <template #header>
      <div class="title" @click="changeShow">
        <img src="@/assets/images/down.svg" :style="{'transform': isShow ? 'rotateX(180deg)' : ''}" />
        <div>
          {{ $t("action.choose") }}
        </div>
      </div>
    </template>
    <template v-if="isShow">
      <Button
        v-for="category in voices"
        :key="category.categoryName"
        :value="$t('voicecategory.' + category.categoryName)"
        :url="'#' + category.categoryName"
        :blank="false"
      />
    </template>
  </Card>
</template>

<script>
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Voices from '@/../setting/voices.json'

export default {
  components: {
    Card,
    Button
  },
  data() {
    return {
      voices: Voices.voices,
      isShow: false
    }
  },
  methods: {
    changeShow() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  img {
    width: 35px;
    margin-left: -8px;
  }
}
</style>
