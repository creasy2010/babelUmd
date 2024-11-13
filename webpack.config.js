// webpack.config.js
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');



module.exports = {
  entry: {
    'BabelParser': '@babel/parser',
    'BabelTraverse': '@babel/traverse',
    'BabelCore': '@babel/core',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].umd.js',
    library: '[name]',
    libraryTarget: 'umd', // 输出格式为 UMD
    globalObject: 'this', // 为浏览器和 Node.js 环境都可用
  },
//   mode: 'production', // 使用生产模式以减少文件大小
  mode: 'development', // 使用生产模式以减少文件大小
  plugins: [
    new NodePolyfillPlugin(), // 添加 polyfill 插件
    new webpack.ProvidePlugin({
        process: 'process/browser', // 提供 process 变量以便在浏览器中使用
      }),
    new webpack.DefinePlugin({
        'process.env.BABEL_TYPES_8_BREAKING': JSON.stringify(false), // 设置为 false 或 true
      'process.env.BABEL_8_BREAKING': JSON.stringify(false),
      'process.env.BABEL_SHOW_CONFIG_FOR': JSON.stringify(''),
      'process.env.BABEL_ENV': JSON.stringify('development'),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BABEL_DISABLE_CACHE': JSON.stringify(false),
      'process.env.BABEL_KEEP_UNUSED_FUNCTIONS': JSON.stringify(false),
      'process.env.FORCE_COLOR': JSON.stringify(true),
    }),
  ],
  resolve: {
    fallback: {
      fs: false, // 禁用 fs，避免打包到浏览器环境
    },
  },
};