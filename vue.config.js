const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'/aa',
  productionSourceMap: true,
  outputDir:'G:\\nodejsprojects\\dojo\\public\\aa',
  chainWebpack: config => {
    /***** worker-loader Start *****/
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      /* 之前导致报错的位置 */
      .options({ filename: '[name].js'})
      .end()

    // config.output.globalObject('this')
    /* worker  热更新 */
    config.module.rule('js').exclude.add(/\.worker\.js$/);
    /***** worker-loader End *****/
  }
})
