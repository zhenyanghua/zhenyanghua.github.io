const fs = require('fs');
const path = require('path');
process.chdir(__dirname);
const {indent} = require('./posts/_build');

function rmFilesSync(files) {
  for (const file of files) {
    if (fs.existsSync(file)) {
      fs.rmSync(file);
    }
  }
}

const inDir = path.join(__dirname, 'dist');
const routesText = fs.readFileSync(path.join(__dirname, 'routes.txt'), "utf8");
const routes = routesText.trim().split('\n')
const meta = require('./postMeta');
for (const url of routes) {
  let inject;

  // inject meta right before title and update title
  if (/^\/\d{4}\/\d{2}\//.test(url)) {
    inject = (originalTitle) => indent`
      <meta name="description" content="${meta[url].summary}">
      <title>${meta[url].title} - ${originalTitle}</title>`;
  } else {
    inject = (originalTitle) => indent`
      <meta name="description" content="Technical blog and creative thoughts by Zhenyang Hua">
      <title>${originalTitle}</title>`;
  }

  const file = path.join(inDir, url, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/(<title>(.*)<\/title>)/, inject('$2'));

  // inject GA as the first item in the head
  const ga = indent`
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WQ9YVRG232"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WQ9YVRG232');
  </script>`
  html = html.replace(/(<head>)/, '$1' + ga);

  fs.writeFileSync(file, html);
}

// Generate sitemap.txt
fs.copyFileSync(
  path.join(__dirname, 'routes.txt'),
  path.join(__dirname, 'dist', 'sitemap.txt')
);

// Remove temporary files
rmFilesSync([
  path.join(__dirname, 'routes.txt'),
  path.join(__dirname, 'postMeta.js')
]);