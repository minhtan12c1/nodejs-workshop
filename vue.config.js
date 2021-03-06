const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}


module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          include: [resolve('src/api'), resolve('src/router'), resolve('src/model')],
          exclude: [resolve('src/api/base-api.js')],
          use: {
            loader: resolve('tools/my-loader.js'),
            options: {
              outDir: resolve('public/lang/gen'),
              langDir: resolve('public/lang'),
            },
          },
        },
      ],
    },
  },
  "transpileDependencies": [
    "vuetify"
  ]
}