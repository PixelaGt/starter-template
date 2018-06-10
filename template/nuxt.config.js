const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

const nuxtConf = {
  env: {
    PRISMIC_ENDPOINT: '{{ prismicRepo }}'
  },
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
      const urlLoader = config.module.rules.find((rule) => rule.loader === 'url-loader');
      const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');

      vueLoader.options.loaders.scss.push({
        loader: 'sass-resources-loader',
        options: {
          resources: [path.join(__dirname, './app/styles/index.scss')],
        }
      });

      urlLoader.exclude = [/assets\/svg/, /assets\/utils/];

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
        exclude: [
          /assets\/utils/,
        ],
        loader: 'svg-sprite-loader',
        options: {
          runtimeCompat: true
        }
      }, {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        include: [
          path.resolve(__dirname, 'app/assets/utils')
        ]
      });
    },
  },
  plugins: [
  ],
  rules: [{
    loader: 'sass-resources-loader',
    options: {
      resources: path.resolve(__dirname, './app/styles/index.scss')
    }
  }]
}

module.exports = nuxtConf;
