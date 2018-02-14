const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

const nuxtConf = {
  srcDir: 'app/',
  head: {
    title: '{{ name }}',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{ description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  build: {
    plugins: [
      new StylelintPlugin()
    ],
    vendor: ['lodash'],
    extend (config, ctx) {
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader')
      urlLoader.exclude = [/assets\/svg/];

      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      config.module.rules.push({
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'app/assets/svg')
        ],
        loader: 'svg-sprite-loader',
        options: {
          runtimeCompat: true
        }
      });
    },
  },
  css: [
    'normalize.css',
    '@/styles/index.scss',
  ],
  plugins: [
  ]
}

module.exports = nuxtConf;
