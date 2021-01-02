const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');
const escape = require('escape-html');
const Prism = require('prismjs');
process.chdir(__dirname);

function indent(strings, ...keys) {
  const match = /[^\s]/.exec(strings);
  if (match) {
    strings = strings.map(string => string.replace(new RegExp(`\\n\\s{${match.index - 1}}`, 'gm'), '\n'));
  }
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < keys.length) {
      result += keys[i];
    }
  }
  return result.replace('\n', '');
}

function createRenderer() {
  const renderer = new marked.Renderer();
  renderer.code = (code, infostring, escaped) => {
    if (!infostring || !(infostring in Prism.languages)) {
      return indent`
        <div class="codeblock">
          <pre>${escape(code)}</pre>
        </div>`;
    }
    const highlighted = Prism.highlight(
      code,
      Prism.languages[infostring],
      infostring
    );

    return indent`
      <div class="codeblock">
        <pre class="language-${infostring}">${highlighted}</pre>  
      </pre>`;
  };
  renderer.heading = (text, level, raw, slugger) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return indent`
      <h${level}>
        <a id="${escapedText}" class="anchor" aria-hidden="true" href="#${escapedText}">
          <span class="header-link"></span>
        </a>${text}</h${level}>`;
  };
  return renderer;
}

const postRoutes = [];
const outDir = '../public/posts';
const renderer = createRenderer();

fs.rmdirSync(outDir, { recursive: true, force: true });

const years = fs.readdirSync('.').filter(x => !x.startsWith("_"));
years.forEach(year => {
  const months = fs.readdirSync(path.join(year));
  months.forEach(month => {
    const posts = fs.readdirSync(path.join(year, month));
    posts.forEach(post => {
      const mdFile = fs.readFileSync(path.join(year, month, post, 'index.md'), 'utf8');
      const url = `/${year}/${month}/${post}`;
      const { data, content } = matter(mdFile);
      console.debug(data);
      // inject meta data to header
      const html = marked(content, { renderer }).replace(/`/g, '\\`');
      const template = indent`
        /**
         * Generated source
         * @author Zhenyang Hua
         */
        import Post from '../../../../components/Post';
        export default function() {
          return (
            <Post {...${JSON.stringify(data)}}>
              <article dangerouslySetInnerHTML={{__html: \`${html}\`}} />
            </Post>
          )
        }`;
      const postDir = path.join(outDir, year, month, post);
      fs.mkdirSync(postDir, { recursive: true });
      fs.writeFileSync(path.join(postDir, 'index.js'), template);
      const route = indent`
        {
          url: "${url}",
          title: "${data.title}",
          date: "${data.date}",
          summary: "${data.summary}",
          Route: lazy(() => import('.${url}')),
        }`;
      postRoutes.push(route);
    });
  });
});

fs.writeFileSync(
  path.join(outDir, 'posts.js'),
  indent`
    /**
     * Generated source
     * @author Zhenyang Hua
     */
    import lazy from 'preact-iso/lazy';
    export const posts = [${postRoutes.reverse().join(',\n')}];`
);

