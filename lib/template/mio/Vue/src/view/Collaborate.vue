<template>
  <Card>
    <template #header>
      {{ $t("action.adtitle") }}
      <Button :value="$t('action.vtbbtn')" url="https://vtbbtn.org" />
      <Button
        v-for="(item, index) in list"
        :key="index"
        :value="item.title"
        :url="item.url"
      />
    </template>
  </Card>
</template>

<script>
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Setting from '@/../setting/setting.json'

const LINKS = Setting['links'] || []

export default {
  components: {
    Card,
    Button
  },
  data() {
    return {
      list: LINKS
    }
  }
}
</script>
