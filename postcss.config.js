'use strict'

module.exports = {
  plugins: [
    require('postcss-smart-import')(),
    require('postcss-cssnext')(),
    require('postcss-reporter')({ clearReportedMessages: true })
  ]
};
