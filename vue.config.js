const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/'))
      .set('_c', resolve('src/components'))
      .set('_v', resolve('src/views'))
      .set('_u', resolve('src/utils'))
      .set('_a', resolve('src/api'))
      .set('_l', resolve('src/lib'))
      .set('_s', resolve('src/store'))
      .set('_p', resolve('src/plugins'))
      .set('_r', resolve('src/router'))
  },
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  }
}
