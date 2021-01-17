<template>
  <div class="select-wrapper" ref="Select">
    <div @click="showItem" class="menu-btn">
      <slot name="icon"> = </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowItem: false
    }
  },
  methods: {
    showItem() {
      if (!this.isShowItem) {
        this.$refs.Select.style.height = 20 + (this.$refs.Select.children.length * 40) + 'px'
        this.$refs.Select.children[0].style['border-bottom-color'] = '#666'
      } else {
        this.$refs.Select.style.height = '48px'
        this.$refs.Select.children[0].style['border-bottom-color'] = 'transparent'
      }
      this.isShowItem = !this.isShowItem
    }
  },
  mounted() {
    for (const i in this.$refs.Select.children) {
      if (this.$refs.Select.children[i].classList) {
        this.$refs.Select.children[i].classList.add('select-btn')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: fixed;
  right: 15px;
  top: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  height: 48px;
  margin: 0;
  padding: 5px;
  background: rgba(50, 50, 50, 0.7);
  color: #fff;
  border-radius: 30px;
  overflow: hidden;
  transition: height 0.2s;
  .menu-btn {
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }
  .select-btn {
    box-sizing: border-box;
    padding: 10px;
    line-height: 18px;
    flex: 0 0 38px;
    width: 90%;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
