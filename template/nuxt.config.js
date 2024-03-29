const webpack = require('webpack')
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
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/bootstrap/bootstrap.scss',
    '~/assets/scss/main.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3b8070' },
  /*
  ** Plugins
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/font-awesome'
  ],
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Axios configuration
  */
  axios: {
    baseURL: process.env.API_BASE || '/api/v1'
  },
  /*
  ** Router configuration
  */
  router: {
    middleware: [
      //
    ]
  },
  /*
  ** SPA mode
  */
  mode: 'spa',
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Babel configuration
    */
    babel: {
      plugins: [
        '@unisharp/babel-plugin'
      ]
    },
    /*
    ** Plugins
    */
    vendor: [
      '@unisharp/helpers.js',
      'axios'
    ],
    plugins: [
      new webpack.ProvidePlugin({
        UniSharp: '@unisharp/helpers.js'
      })
    ],
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
          files: ['**/*.{vue,sss,less,scss,sass}']
        }))
      }
    }
  }
}
