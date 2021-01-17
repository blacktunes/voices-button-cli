module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/../setting/color.scss";`
      }
    }
  }
}