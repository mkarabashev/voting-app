const manifest = require('./manifest');

module.exports = function renderPage(
  head = { meta: '', title: '' },
  reactString = '',
  preloadedState = null
) {
  const reduxScript =  !preloadedState ? '' : `
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
    </script>
  `

  return `
    <!DOCTYPE html>
    <html>
      <head>
        ${head.meta}
        ${head.title}
        ${manifest.css}
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
