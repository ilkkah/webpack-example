var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const source = [
  'quill.js',
  'core.js',
  'blots',
  'core',
  'formats',
  'modules',
  'test',
  'themes',
  'ui',
].map(file => {
  return path.resolve(__dirname, '..', file);
});

const jsRules = {
  test: /\.js$/,
  include: source,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/env',
            {
              targets: {
                browsers: [
                  'last 2 Chrome major versions',
                  'last 2 Firefox major versions',
                  'last 2 Safari major versions',
                  'last 2 Edge major versions',
                  'last 2 iOS major versions',
                  'last 2 ChromeAndroid major versions',
                ],
              },
            },
          ],
        ],
      },
    },
  ],
};

const svgRules = {
  test: /\.svg$/,
  use: [
    {
      loader: 'html-loader',
      options: {
        minimize: true,
      },
    },
  ],
};

const stylRules = {
  test: /\.styl$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
};

const tsRules = {
  test: /\.ts$/,
  use: [
    {
      loader: 'ts-loader',
      options: {
        compilerOptions: {
          declaration: false,
          module: 'es6',
          sourceMap: true,
          target: 'es6',
        },
        transpileOnly: true,
      },
    },
  ],
};

module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname + "/dist",
    library: 'Quill',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: "bundle.js"
  },
  mode: 'development',
  resolve: {
    alias: {
      parchment: path.resolve(
        __dirname,
        './node_modules/parchment/src/parchment',
      ),
    },
    extensions: ['.js', '.styl', '.ts'],
  },
  module: {
    rules: [
      jsRules, 
      stylRules, 
      svgRules, 
      tsRules
    ],
    noParse: [
      /\/node_modules\/clone\/clone\.js$/,
      /\/node_modules\/eventemitter3\/index\.js$/,
      /\/node_modules\/extend\/index\.js$/,
    ],
  }
}
