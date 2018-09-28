var path = require('path')

module.exports = {
  baseUrl: process.VUE_CLI_SERVICE.mode == 'production' ? '/vulcan-chatbot/' : '/',
  devServer: {
    proxy: {
      "/vulcan/*": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  },
  lintOnSave: true,
  outputDir: path.resolve(__dirname, './kaupang/public/vulcan-chatbot'),
};