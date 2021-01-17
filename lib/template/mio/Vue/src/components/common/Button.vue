<template>
  <div class="btn-wrapper" :class="voice ? 'voice-btn' : 'btn'">
    <a v-if="url" :href="url" :target="blank ? '_blank' : ''">{{ value }}</a>
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>

<script>
export default {
  props: {
    voice: {
      type: Boolean,
      default: false
    },
    value: {
      type: String || Number,
      default: ''
    },
    url: {
      type: String,
      default: null
    },
    blank: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #fff;
}

.btn-wrapper {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  max-width: max-content;
  word-break: break-all;
  padding: 6px 12px;
  margin: 5px;
  border-radius: 17px;
  transition: all 0.3s;
  user-select: none;
  cursor: pointer;
}

.btn {
  background: $btn-color;
  box-shadow: 5px 5px 10px #d16767, -5px -5px 10px #ff9494;
  &:hover {
    box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.397);
  }
  &:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
}

.voice-btn {
  background: $voice-btn-color;
  box-shadow: 4px 4px 10px #343434, -4px -4px 10px #686868;
  &:hover {
    box-shadow: 0 0 5px 5px rgba(252, 120, 120, 0.322);
  }
  &:active {
    box-shadow: inset 3px 3px 5px #3c3c3c, inset -3px -3px 5px #606060;
  }
}
</style>
