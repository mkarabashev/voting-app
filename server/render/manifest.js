const fs = require('fs');

const makeElement = attributes => filename => `<${attributes}="/${filename}">`;
const cssString = makeElement('link rel="stylesheet" type="text/css" href');
const jsString = makeElement('script src');

let manifest = {
  app: `${jsString('app.js')}</script>`,
  css: '',
  manifest: '',
  vendor: ''
};

if (process.env.NODE_ENV === 'production') {
  fs.readdirSync('./dist')
    .forEach(filename => {
      if (/\.css$/.test(filename)) manifest.css = cssString(filename);
      if (/app\..*\.js$/.test(filename)) manifest.app = `${jsString(filename)}</script>`;
      if (/vendor\..*\.js$/.test(filename)) manifest.vendor = `${jsString(filename)}</script>`;
      if (/manifest\..*\.js$/.test(filename)) manifest.manifest = `${jsString(filename)}</script>`;
    });
}

module.exports = manifest;
