const manifest = require('./manifest');

module.exports = function renderPage(reactString = '') {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        ${manifest.css}
        <title>react</title>
      </head>
      <body>
        <div id="app">${reactString}</div>
        ${manifest.manifest}
        ${manifest.vendor}
        ${manifest.app}
      </body>
    </html>
  `;
};
