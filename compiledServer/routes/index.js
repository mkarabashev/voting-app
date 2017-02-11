'use strict';

var router = require('express').Router();
var renderToString = require('react-dom/server').renderToString;
var styles = require('../../src/App.jsx');

router.get('/', function (req, res) {
  return res.send('\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <meta charset="utf-8" />\n      <title>react</title>\n    </head>\n    <body>\n      <div id="app">' + String(renderToString(App)) + '</div>\n    </body>\n  </html>\n  ');
});

module.exports = router;