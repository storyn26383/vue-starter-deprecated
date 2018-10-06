const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '{{ name }}',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{ escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3b8070' },
  /*
  ** Build configuration
  */
  build: {
    extend (config, { isDev, isClient }) {
      /*
      ** Run ESLint on save
      */
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.vue$/,
          loader: 'vue-pug-lint-loader',
          options: require('./.puglintrc.js'),
          exclude: /node_modules/
        })

        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })

        config.plugins.push(new StyleLintPlugin({
          files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
        }))
      }
    }
  }
}
