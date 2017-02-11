/*eslint no-unused-vars: 0*/

const router = require('express').Router();
const renderToString = require('react-dom/server').renderToString;
import fs from 'fs';
import App from '../../src/App'

let manifest = {}
fs.readdirSync('./dist')
  .forEach(filename => {
    if (/\.css$/.test(filename)) manifest.css = filename;
    if (/app\..*\.js$/.test(filename)) manifest.app = filename;
    if (/vendor\..*\.js$/.test(filename)) manifest.vendor = filename;
    if (/manifest\..*\.js$/.test(filename)) manifest.manifest = filename;
  })
console.log(manifest)

router.get('/', (req, res) => res.send(
  `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <link href="/${manifest.css}" rel="stylesheet">
      <title>react</title>
    </head>
    <body>
      <div id="app">${renderToString(<App />)}</div>
      <script src="/${manifest.manifest}"></script>
      <script src="/${manifest.vendor}"></script>
      <script src="/${manifest.app}"></script>
    </body>
  </html>
  `
));

module.exports = router;
