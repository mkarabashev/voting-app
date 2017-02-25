import manifest from './manifest';

export default function renderPage(
  preloadedState,
  reactString = '',
  head = { meta: '', title: ''}
) {
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
        <script>
          window.__PRELOADED_STATE__ = ${preloadedState}
        </script>
        ${manifest.manifest}
        ${manifest.vendor}
        ${manifest.app}
      </body>
    </html>
  `;
};
