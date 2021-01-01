// iterate the posts folder and generate one route for each
const fs = require('fs');
const path = require('path');
const marked = require('marked');
process.chdir(__dirname);

const postRoutes = [];
const outDir = '../public/posts';

fs.rmdirSync(outDir, { recursive: true, force: true });

const years = fs.readdirSync('.').filter(x => !x.startsWith("_"));
years.forEach(year => {
  const months = fs.readdirSync(path.join(year));
  months.forEach(month => {
    const posts = fs.readdirSync(path.join(year, month));
    posts.forEach(post => {
      const mdFile = fs.readFileSync(path.join(year, month, post, 'index.md'));
      console.debug(`${year}/${month}/${post}`);

      const html = marked(mdFile.toString()).replace(/`/g, '\\`');
      const template = `export default function() { 
  return (
    <div dangerouslySetInnerHTML={{__html: \`${html}\`}}></div>
  )
}`;
      const postDir = path.join(outDir, year, month, post);
      fs.mkdirSync(postDir, { recursive: true });
      fs.writeFileSync(path.join(postDir, 'index.js'), template);
      const url = `/${year}/${month}/${post}`;
      postRoutes.push(
`  {
    url: "${url}",
    title: "${post} - Articles",
    label: "${post}",
    Route: lazy(() => import('.${url}')),
  }`
      );
    });
  });
});

fs.writeFileSync(path.join(outDir, 'posts.js'),
  `import lazy from 'preact-iso/lazy';\n;
export const posts = [\n${postRoutes.join(',\n')}\n];`);

