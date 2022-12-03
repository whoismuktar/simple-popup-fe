const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "",
  css: {
    extract: false,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
  chainWebpack: (config) => {
    // Clear the existing entry point
    config.entry('app').clear()
  
    // Add the custom entry point
    config.entry('app').add('./src/main.js')
  }
})
