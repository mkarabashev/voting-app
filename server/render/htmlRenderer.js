const manifest = require('./manifest');

module.exports = function renderPage(reactString = '', preloadedState = null) {
  const reduxScript =  !preloadedState ? '' : `
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
    </script>
  `

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
        ${reduxScript}
        ${manifest.manifest}
        ${manifest.vendor}
        ${manifest.app}
      </body>
    </html>
  `;
};
