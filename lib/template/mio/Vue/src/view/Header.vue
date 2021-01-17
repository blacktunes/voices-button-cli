<template>
  <div class="header">
    <div class="title">
      {{ $t("info.title") }}
    </div>
    <img src="@/../setting/bg.png" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px 30px 20px 30px;
  margin-top: 70px;
  .title {
    display: inline-block;
    font-size: 35px;
    font-weight: 900;
    line-height: 100%;
    color: #fff;
    text-align: left;
    text-shadow: rgba(0, 0, 0, 0.308) 5px 6px 10px;
  }
  img {
    width: 40px;
    margin-left: 10px;
  }
}
</style>
