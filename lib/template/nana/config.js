const inquirer = require('inquirer')
const { log } = require('../../log')

module.exports = async function (check) {
  let pwa
  if (check) {
    log()
    log('PWA设置:')
    pwa = await inquirer.prompt([
      {
        type: 'input',
        name: 'color',
        message: '主题颜色:',
        default: '#c4afd0'
      },
      {
        type: 'input',
        name: 'pwaName',
        message: 'PWA应用名:',
        default: 'Voices Button'
      },
      {
        type: 'input',
        name: 'shortName',
        message: 'PWA应用简称:',
        default: function (data) {
          return data.pwaName
        }
      },
      {
        type: 'input',
        name: 'icon',
        message: '应用图标位置(public相对路径):',
        default: '/img/icon.png'
      }
    ])
  }
  return `/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {${check ? `\n  pwa: {
    themeColor: '${pwa.color}',
    manifestOptions: {
      name: '${pwa.name}',
      // eslint-disable-next-line @typescript-eslint/camelcase
      short_name: '${pwa['short_name']}',
      icons: [
        {
          src: '${pwa.icon}',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    },
    workboxOptions: {
      skipWaiting: true,
      exclude: [/\\.(?:mp3|jpg|png|gif)$/],
      // include: [/\\.(?:js|css|html|json|ico)$/],
      runtimeCaching: [
        {
          urlPattern: /\\.(?:mp3)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'voice-cache',
            expiration: {
              // maxEntries: 10, // 缓存数量
              maxAgeSeconds: 60 * 60 * 24 * 7 // 缓存有效时长
            }
          }
        },
        {
          urlPattern: /\\.(?:jpg|png|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              // maxEntries: 10, // 缓存数量
              maxAgeSeconds: 60 * 60 * 24 * 7 // 缓存有效时长
            }
          }
        }
      ]
    },
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null
    }
  },` : ''}
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        import: [path.join(__dirname, './src/setting/color.styl')]
      }
    }
  },
  configureWebpack: () => {
    return {
      performance: {
        hints: false
      },
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\\\/]node_modules[\\\\/]/,
              priority: 10,
              chunks: 'initial' // 只打包初始时依赖的第三方
            },
            corejs: {
              name: 'chunk-corejs', // 单独将 core-js 拆包
              priority: 15,
              test: /[\\\\/]node_modules[\\\\/]core-js[\\\\/]/
            }
          }
        }
      }
    }
  }
}
`
}